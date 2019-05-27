import React from "react";

import {database} from "../../../shared/Firebase";
import collection from "../../../shared/dbCollection";

import voteArrow from "../../../assets/icons/upVoteDownVote.svg";

const ShowAnswers = ({answers, forumQuestion, user}) => {
    let filterAnswers = [];
    if (answers)
        filterAnswers = answers.filter(
            answer => answer.postIdRef === forumQuestion.postiD
        );
    const deleteAnswer = data => {
        console.log(data);
        if (data.userId === user.uid) {
            const dbCollection = database.collection(collection.answer);
            dbCollection
                .doc(data.id)
                .delete()
                .then(() => console.log("Deleted successfully"));
        }
    };

    return (
        <div className="answer">
            {filterAnswers.map(a => {
                let date = a.timestamp.toDate().toLocaleDateString();
                let time = a.timestamp.toDate().toLocaleTimeString();
                return (
                    <div className="answer-container" key={a.id}>
                        <span>Username: {a.username}</span>
                        <span>
                            Date:
                            {date}
                        </span>
                        <span>
                            Time:
                            {time}
                        </span>
                        <div className="vote">
                            <img
                                className="upvote"
                                src={voteArrow}
                                alt="upvote"
                            />
                            <span>votes: {a.votes}</span>
                            <img src={voteArrow} alt="downVote" />
                            {a.userId === user.uid ? (
                                <button
                                    className="deleteButton"
                                    onClick={() => deleteAnswer(a)}
                                >
                                    delete
                                </button>
                            ) : null}
                        </div>

                        <p>
                            Answer:
                            {a.answer}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default ShowAnswers;

//forumQuestion.postID
