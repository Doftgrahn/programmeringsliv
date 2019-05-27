import React from "react";

import voteArrow from "../../../assets/icons/upVoteDownVote.svg";

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
                        <span>Username: {a.username}</span>
                        <span>Date:{date}</span>
                        <span>Time:{time}</span>
                        <div className="vote">
                            <img
                                className="upvote"
                                src={voteArrow}
                                alt="upvote"
                            />
                            <span>votes: {a.votes}</span>
                            <img src={voteArrow} alt="downVote" />
                        </div>
                        <p>Answer:{a.answer}</p>

                    </div>
                );
            })}
        </div>
    );
};

export default ShowAnswers;

//forumQuestion.postID
