import React, {useState, useEffect} from "react";

import Answer from "./answer/Answer";

import {database} from "../../../shared/Firebase";
import collection from "../../../shared/dbCollection";

const ShowAnswers = ({forumQuestion, user}) => {
    const [answers, setAnswer] = useState([]);



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

    let answer = answers
        .filter(answer => answer.postIdRef === forumQuestion.postiD)
        .map(an => (
            <Answer
                key={an.id}
                answer={an}
                forumQuestion={forumQuestion}
                user={user}
            />
        ));

    return <div>{answers.length === 0 ? null : answer}</div>;
};

export default ShowAnswers;
