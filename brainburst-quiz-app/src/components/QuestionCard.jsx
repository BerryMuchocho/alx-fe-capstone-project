import React from 'react';

function QuestionCard({ question, answers, onAnswerSelect }) {
    return (
        <div className="space-y-6 w-full">
            <h2 className="text-left text-lg font-medium" dangerouslySetInnerHTML={{ __html: question }} />

            <ul className="space-y-3">
                {answers.map((answer) => (
                    <li
                        key={answer}
                        onClick={() => onAnswerSelect(answer)}
                        className="cursor-pointer p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition text-left"
                    >
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default QuestionCard;

