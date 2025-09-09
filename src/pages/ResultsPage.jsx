import { Link, useLocation } from "react-router-dom";

function ResultsPage() {
    const location = useLocation();
    const { score = 0, total = 0 } = location.state || {};

    return (
        <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
                Your Score: {score} / {total}
            </h2>
            <p className="mb-6">
                {score === total ? "Perfect!" : "Good try, want to play again?"}
            </p>
            <div className="flex gap-4 justify-center">
                <Link
                    to="/"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                    Home
                </Link>
            </div>
        </div>
    );
}

export default ResultsPage;

