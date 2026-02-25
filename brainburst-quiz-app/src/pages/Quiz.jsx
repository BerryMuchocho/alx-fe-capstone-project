import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import Layout from "../components/Layout";
import ProgressBar from "../components/ProgressBar";
import Timer from "../components/Timer";
import logo from "../assets/brainburst.png";

function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();

  // Read quiz config from navigation state (fallbacks are fine)
  const { category = 9, difficulty = "easy", amount = 10 } = location.state || {};

  const timeMap = { easy: 30, medium: 20, hard: 15 };

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isTransitioningRef = useRef(false);

  // Fetch questions (StrictMode-safe: abort + ignore stale runs)
  useEffect(() => {
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
  }, [amount, category, difficulty]);

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
        <p className="text-center text-red-500">{error}</p>
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