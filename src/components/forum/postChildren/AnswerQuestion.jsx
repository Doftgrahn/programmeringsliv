import React, {useState} from 'react';

const AnswerQuestion = ({isAnswering, hideAnswerInput}) => {
    const [questionInput, setQuestionInput] = useState('');

    return <div className={`post_container-answerWrapper-container ${isAnswering
            ? 'show'
            : 'hide'}`}>
        <input placeholder="Answer Quetsion..." type='text' value={questionInput} onChange={(event) => setQuestionInput(event.target.value)}/>
        <button onClick={hideAnswerInput}>Send</button>
    </div>
}

export default AnswerQuestion;
