import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button";

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
            <div className="max-w-md mx-auto mt-20 text-center space-y-6">
                <h1 className="text-4xl font-extrabold text-blue-600">BrainBurst</h1>
                <p className="text-lg text-gray-500">Beat the clock, have fun!</p>

                {/* Category Selection */}
                <div className="mb-4 text-left">
                    <label className="block mb-1 font-semibold">Select Category:</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    >
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Difficulty Selection */}
                <div className="mb-4 text-left">
                    <label className="block mb-1 font-semibold">Select Difficulty:</label>
                    <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    >
                        {difficulties.map((level) => (
                            <option key={level} value={level}>
                                {level.charAt(0).toUpperCase() + level.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Number of Questions */}
                <div className="mb-4 text-left">
                    <label className="block mb-1 font-semibold">Number of Questions:</label>
                    <input
                        type="number"
                        min={1}
                        max={50}
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 w-full"
                    />
                </div>

                {/* Start Quiz Button */}
                <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
                    onClick={startQuiz}
                >
                    Start Quiz
                </Button>
            </div>
        </Layout>
    );
}

export default Home;
