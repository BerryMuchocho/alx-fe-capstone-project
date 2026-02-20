import Layout from "../components/Layout";
import { Link, useLocation } from "react-router-dom";
import Button from "../components/Button";
import logo from "../assets/brainburst.png";

function Results() {
    const location = useLocation();
    const { score = 0, total = 0 } = location.state || {};
    const quizConfig = location.state?.quizConfig;

    return (
        <Layout>
            <div className="w-full max-w-sm text-center space-y-4">
                <img src={logo} alt="brainburst" className="mx-auto h-24" />
                <h2 className="text-5xl font-semibold leading-none">{score}/{total}</h2>
                <p className="text-gray-600">You got {score}/{total} questions correct</p>

                <div className="space-y-3 pt-2">
                    <Link to="/quiz" state={quizConfig}>
                        <Button className="w-full">Play again</Button>
                    </Link>

                    <Link to="/">
                        <Button className="w-full bg-blue-500 hover:bg-blue-600">Choose another category</Button>
                    </Link>

                    <Link to="/">
                        <Button className="w-full bg-slate-600 hover:bg-slate-700">Exit</Button>
                    </Link>
                </div>
            </div>
        </Layout>
    );
}

export default Results;

