import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import Layout from "../components/Layout";
import ProgressBar from "../components/ProgressBar";
import Timer from "../components/Timer";
import logo from "../assets/brainburst.png";

const QUIZ_SESSION_KEY = "brainburst_quiz_session_v1";

function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();

  // Read quiz config from navigation state 
  const { category = 9, difficulty = "easy", amount = 10 } = location.state || {};

  const timeMap = { easy: 30, medium: 20, hard: 15 };

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isTransitioningRef = useRef(false);

  // 1) Restore session on mount (handles refresh)
  useEffect(() => {
    const raw = sessionStorage.getItem(QUIZ_SESSION_KEY);
    if (!raw) return;

    try {
      const saved = JSON.parse(raw);

      // Only restore if it matches the same quiz config
      const sameConfig =
        Number(saved?.quizConfig?.category) === Number(category) &&
        String(saved?.quizConfig?.difficulty) === String(difficulty) &&
        Number(saved?.quizConfig?.amount) === Number(amount);

      if (sameConfig && Array.isArray(saved?.questions) && saved.questions.length > 0) {
        setQuestions(saved.questions);
        setCurrentQuestionIndex(saved.currentQuestionIndex ?? 0);
        setScore(saved.score ?? 0);
        setLoading(false);
        setError(null);
        isTransitioningRef.current = false;
      }
    } catch {
      sessionStorage.removeItem(QUIZ_SESSION_KEY);
    }
  }, [amount, category, difficulty]);

  // 2) Fetch questions only if we don't already have them
  useEffect(() => {
    if (questions.length > 0) return; // already restored from session or already fetched

    const controller = new AbortController();
    let active = true;

    async function fetchQuestions() {
      try {
        setLoading(true);
        setError(null);

        const url = `https://opentdb.com/api.php?amount=${Number(amount)}&category=${Number(
          category
        )}&difficulty=${difficulty}&type=multiple`;

        const res = await fetch(url, { signal: controller.signal });
        const data = await res.json();

        if (!active) return;

        if (data.response_code !== 0) {
          throw new Error(`OpenTDB error (response_code=${data.response_code}).`);
        }

        if (!data.results?.length) {
          throw new Error("No questions available for this selection.");
        }

        const formattedQuestions = data.results.map((q) => {
          const options = [...q.incorrect_answers];
          const randomIndex = Math.floor(Math.random() * (options.length + 1));
          options.splice(randomIndex, 0, q.correct_answer);
          return { ...q, options };
        });

        setQuestions(formattedQuestions);
        setCurrentQuestionIndex(0);
        setScore(0);
        isTransitioningRef.current = false;

        // Save fresh session immediately (so refresh works right away)
        sessionStorage.setItem(
          QUIZ_SESSION_KEY,
          JSON.stringify({
            quizConfig: { category, difficulty, amount },
            questions: formattedQuestions,
            currentQuestionIndex: 0,
            score: 0,
          })
        );
      } catch (err) {
        if (err?.name === "AbortError") return; // expected in dev StrictMode
        if (!active) return;
        setError(err?.message || "Failed to fetch questions.");
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchQuestions();

    return () => {
      active = false;
      controller.abort();
    };
  }, [amount, category, difficulty, questions.length]);

  // 3) Persist progress as user moves through questions
  useEffect(() => {
    if (questions.length === 0) return;

    sessionStorage.setItem(
      QUIZ_SESSION_KEY,
      JSON.stringify({
        quizConfig: { category, difficulty, amount },
        questions,
        currentQuestionIndex,
        score,
      })
    );
  }, [amount, category, difficulty, questions, currentQuestionIndex, score]);

  // Reset transition guard when moving to a new question
  useEffect(() => {
    isTransitioningRef.current = false;
  }, [currentQuestionIndex]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = useCallback(
    (selectedAnswer = null) => {
      if (!currentQuestion || isTransitioningRef.current) return;
      isTransitioningRef.current = true;

      const isCorrect = selectedAnswer === currentQuestion.correct_answer;
      const updatedScore = isCorrect ? score + 1 : score;

      if (currentQuestionIndex + 1 < questions.length) {
        setScore(updatedScore);
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        // Quiz complete — clear session so refresh doesn't revive old quiz
        sessionStorage.removeItem(QUIZ_SESSION_KEY);

        navigate("/results", {
          state: {
            score: updatedScore,
            total: questions.length,
            quizConfig: { category, difficulty, amount },
          },
        });
      }
    },
    [
      amount,
      category,
      difficulty,
      currentQuestion,
      currentQuestionIndex,
      navigate,
      questions.length,
      score,
    ]
  );

  if (loading) {
    return (
      <Layout>
        <p className="text-center text-lg">Loading questions...</p>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center space-y-3">
          <p className="text-center text-red-500">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </Layout>
    );
  }

  if (!currentQuestion) {
    return (
      <Layout>
        <p className="text-center text-red-500">Unable to load the current question.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between w-full">
            <img src={logo} alt="logo" className="h-10" />
            <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>

            <Timer
              initialTime={timeMap[difficulty]}
              resetKey={currentQuestionIndex}
              onTimeUp={() => handleAnswer(null)}
            />
          </div>

          <p className="text-gray-600 capitalize">Difficulty: {difficulty}</p>

          <QuestionCard
            question={currentQuestion.question}
            answers={currentQuestion.options}
            onAnswerSelect={handleAnswer}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Quiz;