import { Link } from "react-router-dom";

function ResultsPage() {
    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Your Score: 4 / 5</h2>
            <p className="mb-6">Great job! 🎉</p>
            <div className="flex gap-4 justify-center">
                <Link
                    to="/quiz"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                    Play Again
                </Link>
                <Link
                    to="/"
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
                >
                    Home
                </Link>
            </div>
        </div>
    );
}

export default ResultsPage;
