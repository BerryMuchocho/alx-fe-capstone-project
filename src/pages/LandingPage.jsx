import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">BrainBurst</h1>
            <p className="mb-6 text-gray-700">Test your knowledge with fun quizzes!</p>
            <Link
                to="/quiz"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
                Start Quiz
            </Link>
        </div>
    );
}

export default LandingPage;
