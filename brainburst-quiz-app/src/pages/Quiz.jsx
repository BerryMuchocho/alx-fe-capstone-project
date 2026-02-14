import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import Layout from "../components/Layout";

function Quiz() {

    const navigate = useNavigate();

    const mockQuestions = [
        {
            question: "What is 2 + 2?",
            correct_answer: "4",
            incorrect_answers: ["3", "5", "22"]
        },
        {
            question: "What is the capital of France?",
            correct_answer: "Paris",
            incorrect_answers: ["London", "Berlin", "Madrid"]
        },
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [ score, setScore] = useState(0);

    const currentQuestion = mockQuestions[currentQuestionIndex];

    const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer,].sort();

    function handleAnswerSelect(answer) {
        const isCorrect = answer === currentQuestion.correct_answer;
        const updatedScore = isCorrect ? score + 1 : score;

        if (currentQuestionIndex + 1 < mockQuestions.length) {
            setScore(updatedScore);
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            navigate("/results", { 
                state:  {
                    score: updatedScore,
                    total: mockQuestions.length 
                }
            }, 
           );
        }
    }

    return (
        <Layout>
        <div className="p-6 max-w-2xl mx-auto text-black space-y-6">
            <h2 className="mb-4 text-xl text-center font-semibold"> 
                Question {currentQuestionIndex + 1} of {mockQuestions.length}
            </h2>

            <QuestionCard
            question={currentQuestion.question}
            answers={answers}
            onAnswerSelect={handleAnswerSelect} 
            />
        </div>
        </Layout>
    );
}

export default Quiz;

