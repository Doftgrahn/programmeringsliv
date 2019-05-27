import React from "react";

const ShowAnswers = ({answers, forumQuestion}) => {
    let filterAnswers = [];
    if (answers)
        filterAnswers = answers.filter(
            answer => answer.postIdRef === forumQuestion.postiD
        );

    return (
        <div className="answer">
            {filterAnswers.map(a => {
                let date = a.timestamp.toDate().toLocaleDateString();
                let time = a.timestamp.toDate().toLocaleTimeString();
                return (
                    <div className="answer-container" key={a.id}>
                    <p>{a.answer}</p>
                        <div>
                            <span>{a.username}</span>
                            <span>{date}</span>
                            <span>{time}</span>
                            <span>votes: {a.votes}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ShowAnswers;

//forumQuestion.postID
