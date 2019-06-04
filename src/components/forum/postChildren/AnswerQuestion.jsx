import React, {useState} from "react";
import {Link} from "react-router-dom";

import {database} from "../../../shared/Firebase";
import collection from "../../../shared/dbCollection";

const AnswerQuestion = ({user, forumData}) => {
    const textareaRef = React.createRef();
    const [questionInput, setQuestionInput] = useState("");
    const [isAnswering, setIsAnswering] = useState(false);

    const showAnswerInput = () => {
        setIsAnswering(true);
        textareaRef.current.select();
    };
    const hideAnswerInput = () => {
        setIsAnswering(false);
        setQuestionInput("");
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
                    timestamp: new Date(),
                    postIdRef: post.postiD,
                    votes: 0
                })
                .then(() =>
                    console.log(
                        "%c successfully sent question",
                        "background: #222; color: #bada55"
                    )
                );
            setQuestionInput("");
            hideAnswerInput();
        }
    };

    return (
        <div className="post_container-answerWrapper">
            <div className="post_container-answerWrapper-button">
                <button className="showBtn" onClick={showAnswerInput}>
                    Answer
                </button>
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
                <span>
                    {questionInput.length}
                    /500
                </span>
                {questionInput.length > 500 ? (
                    <span className="errorMessage">
                        Can't enter more than 500 characters
                    </span>
                ) : null}
                <textarea
                    ref={textareaRef}
                    placeholder="Answer Question..."
                    type="text"
                    maxLength="120"
                    value={questionInput}
                    onChange={event => setQuestionInput(event.target.value)}
                />

                <div className="button_container">
                    <button onClick={hideAnswerInput}>
                        <i className="fas fa-trash" />
                    </button>

                    <button onClick={() => sendQuestion(forumData)}>
                        <i className="fas fa-paper-plane" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnswerQuestion;
