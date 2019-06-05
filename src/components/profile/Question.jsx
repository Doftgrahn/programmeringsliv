import React, {useState} from 'react';

const Question = ({ question }) => {
    const [timestamp] = useState(question.timestamp);
    let time = timestamp.toDate().toLocaleTimeString();
    let date = timestamp.toDate().toLocaleDateString();
return (
    <div> Question:
        <div className="postDiv">
            <div className="question">{question.title} </div>
            <div className="questionContent">{question.content}</div>
                <div className="postMetadata">
                    <span className="date">{date} {time}</span>
                    {/*<span className="votes">{question.votes} votes</span>*/}
                </div>
        </div>
    </div>
    )
}

export default Question;