import { Link } from "react-router-dom";

function QuizPage() {
    return (
        <div className="text-center max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Question 1 of 5</h2>
            <p className="mb-6">What is the capital of France?</p>

            <div className="flex flex-col gap-3">
                <button className="bg-gray-200 py-2 rounded hover:bg-gray-300">Berlin</button>
                <button className="bg-gray-200 py-2 rounded hover:bg-gray-300">Madrid</button>
                <button className="bg-gray-200 py-2 rounded hover:bg-gray-300">Paris</button>
                <button className="bg-gray-200 py-2 rounded hover:bg-gray-300">Rome</button>
            </div>

            <Link
                to="/results"
                className="block mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
                Submit Answer
            </Link>
        </div>
    );
}

export default QuizPage;
