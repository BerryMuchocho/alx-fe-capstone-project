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
  const [loadingCategories, setLoadingCategories] = useState(true);

  const difficulties = ["easy", "medium", "hard"];

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoadingCategories(true);
        const res = await fetch("https://opentdb.com/api_category.php");
        const data = await res.json();

        setCategories(data.trivia_categories || []);
        if (data.trivia_categories?.length > 0) {
          setSelectedCategory(String(data.trivia_categories[0].id));
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoadingCategories(false);
      }
    }
    fetchCategories();
  }, []);

  const startQuiz = () => {
    if (!selectedCategory) {
      alert("Please select a category.");
      return;
    }

    const amount = Number(numQuestions);
    if (Number.isNaN(amount) || amount < 1 || amount > 50) {
      alert("Please enter a number of questions between 1 and 50.");
      return;
    }

    navigate("/quiz", {
      state: {
        category: Number(selectedCategory),
        difficulty: selectedDifficulty,
        amount,
      },
    });
  };

  return (
    <Layout>
      <div className="w-full text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-blue-600">
          BrainBurst Quiz
        </h1>
        <p className="text-gray-600 mt-2 mb-8">Beat the clock. Have fun!</p>

        <div className="space-y-5 max-w-sm mx-auto">
          {/* Category Selection */}
          <div>
            <label className="block mb-2 font-semibold text-left">Select Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              disabled={loadingCategories}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white text-slate-900 disabled:bg-gray-100 disabled:text-gray-500"
            >
              {loadingCategories ? (
                <option>Loading categories...</option>
              ) : (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Select Difficulty Level */}
          <div>
            <label className="block mb-2 font-semibold text-left">Select Difficulty</label>
            <div className="flex gap-3">
              {difficulties.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSelectedDifficulty(level)}
                  className={`flex-1 py-2 rounded-lg border font-medium transition ${
                    selectedDifficulty === level
                      ? "bg-blue-600 text-white border-transparent"
                      : "bg-white text-slate-800 border-gray-300 hover:bg-slate-50"
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
              className="border border-gray-300 rounded-lg px-3 py-2 w-full bg-white text-slate-900"
            />
            <p className="text-xs text-slate-500 mt-1 text-left">
              Choose between 1 and 50 questions.
            </p>
          </div>

          {/* Start Quiz Button */}
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg w-full"
            onClick={startQuiz}
          >
            Start Quiz
          </Button>

          <p className="text-xs text-slate-500">
            Ready for {numQuestions} {selectedDifficulty} questions.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Home;