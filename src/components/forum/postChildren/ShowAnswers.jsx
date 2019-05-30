import React, {useState, useEffect} from "react";

import Answer from "./answer/Answer";

import {database} from "../../../shared/Firebase";
import collection from "../../../shared/dbCollection";

const ShowAnswers = ({forumQuestion, user}) => {
    const [answers, setAnswer] = useState(null);

    useEffect(() => {
        let isSubscribed = true;
        const answerCollection = database.collection(collection.answer);
        answerCollection.onSnapshot(snapshot => {
            if (isSubscribed) {
                const list = [];
                snapshot.forEach(doc => {
                    list.push({...doc.data(), id: doc.id});
                });
                setAnswer(list);
            }
        });
        return () => (isSubscribed = false);
    }, []);

    let answer;
    if (answers)
        answer = answers
            .filter(answer => answer.postIdRef === forumQuestion.postiD)
            .map((an, i) => (
                <Answer
                    key={an.id}
                    answer={an}
                    forumQuestion={forumQuestion}
                    user={user}
                />
            ));

    return <>{!answers ? null : answer}</>;
};

export default ShowAnswers;

//forumQuestion.postID

/*
<div className="answer">
    {filterAnswers.map(a => {
        let date = a.timestamp.toDate().toLocaleDateString();
        let time = a.timestamp.toDate().toLocaleTimeString();
        return (
            <div className="answer-container" key={a.id}>
                <div className="answer-photo">
                    <img src={a.photoURL} alt="userPhoto" />
                </div>
                <span>Username: {a.username}</span>
                <span>
                    posted:
                    {date} {time}
                </span>
                <div className="vote">
                    <img
                        onClick={() => upVote(a)}
                        className="upvote"
                        src={voteArrow}
                        alt="upvote"
                    />
                    <span>votes: {filteredUpvotes}</span>
                    <img src={voteArrow} alt="downVote" />
                </div>

                <div className="answerAndDeletel-container">
                    <p>
                        Answer:
                        {a.answer}
                    </p>
                    {user && a.userId === user.uid ? (
                        <button
                            className="deleteButton"
                            onClick={() => deleteAnswer(a)}
                        >
                            delete
                        </button>
                    ) : null}
                </div>
            </div>
        );
    })}
</div>
*/
