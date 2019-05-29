import React, {useState} from "react";
import {Link} from "react-router-dom";

import {database} from "../../../shared/Firebase";
import collection from "../../../shared/dbCollection";

const AnswerQuestion = ({user, forumData}) => {
    const [questionInput, setQuestionInput] = useState("");
    const [isAnswering, setIsAnswering] = useState(false);

    const showAnswerInput = () => {
        setIsAnswering(true);
    };
    const hideAnswerInput = () => {
        setIsAnswering(false);
    };

    const sendQuestion = post => {
        const collectionRef = database.collection(collection.answer).doc();
        if (questionInput && user) {
            collectionRef
                .set({
                    answer: questionInput,
                    username: user.displayName,
                    photoURL: user.photoURL,
                    userId: user.uid,
                    timestamp: new Date(), // postI
                    postIdRef: post.postiD, // TODO!!!!!: Fix id, connect with post.
                    votes: 0
                })
                .then(() => console.log("Success"));
            setQuestionInput("");
            hideAnswerInput();
        }
    };

    return (
        <div className="post_container-answerWrapper">
            <div className="post_container-answerWrapper-button">
                <button onClick={showAnswerInput}>Answer</button>
            </div>
            <div
                className={`post_container-answerWrapper-container ${
                    isAnswering ? "show" : "hide"
                }`}
            >
                {user ? (
                    <span>
                        Comment as:
                        <Link className="linktoProfile" to="/profile">
                            {user.displayName}
                        </Link>
                    </span>
                ) : (
                    ""
                )}
                <textarea
                    placeholder="Answer Question..."
                    type="text"
                    value={questionInput}
                    onChange={event => setQuestionInput(event.target.value)}
                />
                <div className="button_container">
                    <button onClick={() => sendQuestion(forumData)}>
                        Send
                    </button>
                    <button onClick={hideAnswerInput}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AnswerQuestion;
