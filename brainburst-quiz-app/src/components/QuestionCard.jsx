import React from 'react';

function QuestionCard({ question, answers, onAnswerSelect }) {
    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="mb-4" dangerouslySetInnerHTML={{__html: question}} />
            <ul>
                {answers.map((answer => (
                    <li key={answer}
                    onClick={() => onAnswerSelect(answer)}
                    className="cursor-pointer mb-2 p-2 bg-gray-100 rounded hover:bg-gray-200" >
                        <span dangerouslySetInnerHTML={{__html: answer}} />
                    </li>
                )))}
            </ul>
        </div>
    );

}

export default QuestionCard;

