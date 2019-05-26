import React, {useState} from "react";

import {database} from "../../../shared/Firebase";
import collection from "../../../shared/dbCollection";

const AnswerQuestion = ({isAnswering, hideAnswerInput, user, forumData}) => {
    const [questionInput, setQuestionInput] = useState("");

    const sendQuestion = postId => {
        console.log("this should be the post id", postId);
        const collectionRef = database.collection(collection.answer).doc();
        if (questionInput && user) {
            collectionRef
                .set({
                    question: questionInput,
                    userId: user.uid,
                    timestamp: new Date(),
                    postId: postId.postId, // TODO!!!!!: Fix id, connect with post.
                    votes: 0
                })
                .then(() => console.log("Success"));
            setQuestionInput("");
            hideAnswerInput();
        }
    };

    return (
        <div
            className={`post_container-answerWrapper-container ${
                isAnswering ? "show" : "hide"
            }`}
        >
            <textarea
                placeholder="Answer Quetsion..."
                type="text"
                value={questionInput}
                onChange={event => setQuestionInput(event.target.value)}
            />
            <div className="button_container">
                <button onClick={() => sendQuestion(forumData)}>Send</button>
                <button onClick={hideAnswerInput}>Cancel</button>
            </div>
        </div>
    );
};

export default AnswerQuestion;
