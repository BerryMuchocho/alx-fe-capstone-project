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
      <div className="w-full flex flex-col items-center text-center space-y-6">
        <img src={logo} alt="brainburst" className="h-32 w-auto" />

        <h2 className="text-6xl font-extrabold leading-none text-slate-900">
          {score}/{total}
        </h2>

        <p className="text-gray-600">
          You got {score}/{total} questions correct
        </p>

        <div className="w-full max-w-sm mx-auto flex flex-col gap-3 pt-2">
          <Link to="/quiz" state={quizConfig} className="w-full">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Play again
            </Button>
          </Link>

          <Link to="/" className="w-full">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Choose another category
            </Button>
          </Link>

          <Link to="/" className="w-full">
            <Button className="w-full bg-slate-600 hover:bg-slate-700 text-white">
              Exit
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Results;