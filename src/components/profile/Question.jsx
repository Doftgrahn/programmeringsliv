import React from 'react';

const Question = ({ question }) => (
    <div> Question:
        <div className="postDiv">
            <div className="question">{question.title} </div>
            <div className="questionContent">{question.content}</div>
                <div className="postMetadata">
                    <span className="date">19/05/23 16:45PM</span>
                    <span className="votes">{question.votes} votes</span>
                </div>
        </div>
    </div>
)

export default Question;