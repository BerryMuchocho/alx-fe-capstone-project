import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button";
import logo from "../assets/brainburst.png";

function Home() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
    const [numQuestions, setNumQuestions] = useState(10);

    const difficulties = ["easy", "medium", "hard"];

    // Fetch categories from Open Trivia DB
    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch("https://opentdb.com/api_category.php");
                const data = await res.json();
                setCategories(data.trivia_categories);
                if (data.trivia_categories.length > 0) {
                    setSelectedCategory(data.trivia_categories[0].id); // default selection
                }
            } catch (err) {
                console.error("Failed to fetch categories", err);
            }
        }
        fetchCategories();
    }, []);

    const startQuiz = () => {
        if (!selectedCategory) {
            alert("Please select a category.");
            return;
        }

        if (numQuestions < 1 || numQuestions > 50) {
            alert("Please enter a number of questions between 1 and 50.");
            return;
        }

        navigate("/quiz", {
            state: {
                category: selectedCategory,
                difficulty: selectedDifficulty,
                amount: Number(numQuestions),
            },
        });
    };

    return (
        <Layout>
            <div className="w-full text-center">
                <img src={logo} alt="brainburst" className="mx-auto h-28 mb-4" />
                <p className="text-gray-600 mb-6">Beat the clock. Have fun!</p>

                <div className="space-y-4 max-w-sm mx-auto">
                    {/* Category Selection */}
                    <div>
                        <label className="block mb-2 font-semibold text-left">Select Category</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full bg-white text-slate-900"
                        >
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Difficulty Selection as pills */}
                    <div>
                        <label className="block mb-2 font-semibold text-left">Select Difficulty</label>
                        <div className="flex gap-3">
                            {difficulties.map((level) => (
                                <button
                                    key={level}
                                    onClick={() => setSelectedDifficulty(level)}
                                    className={`flex-1 py-2 rounded-lg border font-medium ${
                                        selectedDifficulty === level
                                            ? "bg-blue-500 text-white border-transparent"
                                            : "bg-white text-slate-800 border-gray-300"
                                    }`}
                                >
                                    {level.charAt(0).toUpperCase() + level.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Number of Questions */}
                    <div>
                        <label className="block mb-2 font-semibold text-left">Number of Questions</label>
                        <input
                            type="number"
                            min={1}
                            max={50}
                            value={numQuestions}
                            onChange={(e) => setNumQuestions(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full bg-white text-slate-900"
                        />
                    </div>

                    {/* Start Quiz Button */}
                    <Button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded w-full"
                        onClick={startQuiz}
                    >
                        Start Quiz
                    </Button>
                </div>
            </div>
        </Layout>
    );
}

export default Home;
