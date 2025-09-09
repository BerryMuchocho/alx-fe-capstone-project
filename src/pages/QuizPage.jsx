import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function QuizPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // Get settings from LandingPage
    const { amount = 5, category = 9, difficulty = "easy" } = location.state || {};

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question

    // Fetch questions
    useEffect(() => {
        async function fetchQuestions() {
            try {
                const res = await fetch(
                    `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
                );
                const data = await res.json();

                // Shuffle answers
                const formatted = data.results.map((q) => {
                    const options = [...q.incorrect_answers];
                    const randomIndex = Math.floor(Math.random() * (options.length + 1));
                    options.splice(randomIndex, 0, q.correct_answer);
                    return { ...q, options };
                });

                setQuestions(formatted);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch questions", err);
                setLoading(false);
            }
        }
        fetchQuestions();
    }, [amount, category, difficulty]);

    // Timer effect
    useEffect(() => {
        if (loading) return;

        if (timeLeft === 0) {
            handleNextQuestion(); // auto move if time runs out
            return;
        }

        const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, loading]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg font-semibold">Loading quiz...</p>
            </div>
        );
    }

    if (!questions.length) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-lg font-semibold">No questions available.</p>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];

    function handleAnswer(answer) {
        if (answer === currentQuestion.correct_answer) {
            setScore((prev) => prev + 1);
        }
        handleNextQuestion();
    }

    function handleNextQuestion() {
        if (currentIndex + 1 < questions.length) {
            setCurrentIndex((prev) => prev + 1);
            setTimeLeft(30); // reset timer
        } else {
            navigate("/results", { state: { score, total: questions.length } });
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">
                        Question {currentIndex + 1} of {questions.length}
                    </h2>
                    <span className="text-sm text-gray-600 capitalize">
                        {difficulty} mode
                    </span>
                </div>

                {/* Timer Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div
                        className="bg-red-500 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${(timeLeft / 30) * 100}%` }}
                    ></div>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                    Time Left: <span className="font-bold text-red-600">{timeLeft}s</span>
                </p>

                {/* Question */}
                <p
                    className="mb-6 text-lg font-medium"
                    dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
                />

                {/* Answer Options */}
                <div className="flex flex-col gap-3">
                    {currentQuestion.options.map((option, i) => (
                        <button
                            key={i}
                            className="bg-gray-100 border border-gray-300 py-2 px-4 rounded-lg hover:bg-blue-100 text-left"
                            onClick={() => handleAnswer(option)}
                            dangerouslySetInnerHTML={{ __html: option }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default QuizPage;

