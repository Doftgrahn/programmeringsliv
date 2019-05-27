import React from "react";

const ShowAnswers = ({answers, forumQuestion}) => {
    let filterAnswers = [];
    if (answers)
        filterAnswers = answers.filter(
            answer => answer.postIdRef === forumQuestion.postiD
        );

    return (
        <div>
            {filterAnswers.map(answer => (
                <span key={answer.id}>{answer.answer}</span>
            ))}
        </div>
    );
};

export default ShowAnswers;

//forumQuestion.postID
