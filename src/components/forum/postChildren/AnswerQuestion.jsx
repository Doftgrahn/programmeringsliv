import React, {useState} from "react";

import {database} from "../../../shared/Firebase";
import collection from "../../../shared/dbCollection";

const AnswerQuestion = ({isAnswering, hideAnswerInput}) => {
    const [questionInput, setQuestionInput] = useState("");

    const sendQuestion = () => {
        const collectionRef = database.collection(collection.answer).doc();
        collectionRef
            .set({question: questionInput})
            .then(() => console.log("Success"));
        setQuestionInput("");
        hideAnswerInput();
    };

    return (
        <div
            className={`post_container-answerWrapper-container ${
                isAnswering ? "show" : "hide"
            }`}
        >
            <input
                placeholder="Answer Quetsion..."
                type="text"
                value={questionInput}
                onChange={event => setQuestionInput(event.target.value)}
            />
            <button onClick={sendQuestion}>Send</button>
        </div>
    );
};

export default AnswerQuestion;
