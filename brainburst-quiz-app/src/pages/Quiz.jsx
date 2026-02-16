import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import Layout from "../components/Layout";

function Quiz() {
    const navigate = useNavigate();
    const location = useLocation();

    // Get category and difficulty from previous page (or default values)
    const { category = 9, difficulty = "easy", amount = 10 } = location.state || {};

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch questions dynamically based on category, difficulty, and amount
    useEffect(() => {
        async function fetchQuestions() {
            try {
                setLoading(true);
                const res = await fetch(
                    `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
                );
                const data = await res.json();

                if (data.response_code !== 0 || !data.results.length) {
                    throw new Error("No questions available for this selection.");
                }

                // Shuffle answers for each question
                const formattedQuestions = data.results.map((q) => {
                    const options = [...q.incorrect_answers];
                    const randomIndex = Math.floor(Math.random() * (options.length + 1));
                    options.splice(randomIndex, 0, q.correct_answer);
                    return { ...q, options };
                });

                setQuestions(formattedQuestions);
                setLoading(false);
            } catch (err) {
                setError(err.message || "Failed to fetch questions.");
                setLoading(false);
            }
        }
        fetchQuestions();
    }, [amount, category, difficulty]);

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

    const currentQuestion = questions[currentQuestionIndex];

    function handleAnswer(selectedAnswer) {
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
                },
            });
        }
    }

    return (
        <Layout>
            <div className="max-w-2xl mx-auto">
                <h2 className="mb-6 text-2xl font-bold text-center">
                    Question {currentQuestionIndex + 1} of {questions.length}
                </h2>

                <p className="mb-4 text-center text-gray-600 capitalize">
                    Difficulty: {difficulty}
                </p>

                <QuestionCard
                    question={currentQuestion.question}
                    answers={currentQuestion.options}
                    onAnswerSelect={handleAnswer}
                />
            </div>
        </Layout>
    );
}

export default Quiz;
