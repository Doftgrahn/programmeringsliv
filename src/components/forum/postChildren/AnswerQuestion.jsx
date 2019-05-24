import React, {useState} from "react";

import {database} from "../../../shared/Firebase";
import collection from "../../../shared/dbCollection";

const AnswerQuestion = ({isAnswering, hideAnswerInput, user}) => {
    const [questionInput, setQuestionInput] = useState("");

    const sendQuestion = () => {
        const collectionRef = database.collection(collection.answer).doc();
        if (questionInput) {
            collectionRef
                .set({
                    question: questionInput,
                    userId: user.uid,
                    timestamp: new Date()
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
                <button onClick={sendQuestion}>Send</button>
                <button onClick={hideAnswerInput}>Cancel</button>
            </div>
        </div>
    );
};

export default AnswerQuestion;
