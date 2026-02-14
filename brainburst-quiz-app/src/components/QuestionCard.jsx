import React from 'react';

function QuestionCard({ question, answers, onAnswerSelect }) {
    return (
        <div className="space-y-6">
            <h2 className="mb-4" dangerouslySetInnerHTML={{__html: question}} />
            <ul className="space-y-3">
                {answers.map((answer => (
                    <li key={answer}
                    onClick={() => onAnswerSelect(answer)}
                    className="cursor-pointer p-3 border rounded-lg hover:bg-gray-100 transition" >
                        <span dangerouslySetInnerHTML={{__html: answer}} />
                    </li>
                )))}
            </ul>
        </div>
    );

}

export default QuestionCard;

