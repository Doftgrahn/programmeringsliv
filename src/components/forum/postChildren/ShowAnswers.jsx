import React from "react";

const ShowAnswers = ({answers}) => {
    let answer;
    if (answers) {
        answer = answers.map((a, i) => <li key={i}>{a.question}</li>);
    }
    return <ul>{answer}</ul>;
};

export default ShowAnswers;
