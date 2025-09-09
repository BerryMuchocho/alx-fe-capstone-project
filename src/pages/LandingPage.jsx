import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(9); // Default: General Knowledge
    const [difficulty, setDifficulty] = useState("easy");
    const [amount, setAmount] = useState(5);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch("https://opentdb.com/api_category.php");
                const data = await res.json();
                setCategories(data.trivia_categories);
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        }
        fetchCategories();
    }, []);

    function handleStartQuiz() {
        navigate("/quiz", {
            state: { category, difficulty, amount },
        });
    }

    return (
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
            <h1 className="text-4xl font-bold mb-6">BrainBurst</h1>
            <p className="mb-6 text-gray-700">Beat the clock. Have fun!</p>

            {/* Category dropdown */}
            <label className="block mb-2 text-gray-600 font-medium">Category</label>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border p-2 rounded mb-4"
            >
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>

            {/* Difficulty dropdown */}
            <label className="block mb-2 text-gray-600 font-medium">Difficulty</label>
            <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full border p-2 rounded mb-4"
            >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>

            {/* Amount input */}
            <label className="block mb-2 text-gray-600 font-medium">
                Number of Questions
            </label>
            <input
                type="number"
                min="1"
                max="20"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border p-2 rounded mb-6"
            />

            <button
                onClick={handleStartQuiz}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full"
            >
                Start Quiz
            </button>
        </div>
    );
}

export default LandingPage;

