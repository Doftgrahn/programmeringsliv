import React from "react";

const ShowAnswers = ({answers}) => {
    let answer;
    if (answers) {
        answer = answers.map((a, i) => <span key={i}>{a.question}</span>);
    }
    return <div>{null}</div>;
};

export default ShowAnswers;
