import React, {useState, useEffect} from "react";

import SortAButtons from "./sortButtonsA/SortAButtons";

import Answer from "./answer/Answer";

import {database} from "../../../shared/Firebase";
import collection from "../../../shared/dbCollection";

const ShowAnswers = ({forumQuestion, user}) => {
    const [answers, setAnswer] = useState([]);
    const [votesAnswers, setVoteAnswers] = useState([]);
    const [sortKey, setSortKey] = useState("");

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

    useEffect(() => {
        const voteACollection = database.collection(collection.votes_answers);
        const unsubscribe = voteACollection.onSnapshot(snapshot => {
            const list = [];
            snapshot.forEach(doc => {
                list.push({...doc.data(), id: doc.id});
            });
            setVoteAnswers(list);
        });
        return unsubscribe;
    }, []);

    const sortByNewest = () => {
        const newest = answers.sort(
            (a, b) => b.timestamp.seconds - a.timestamp.seconds
        );
        setAnswer(newest);
        setSortKey("newest");
    };
    const sortByOldest = () => {
        const oldest = answers.sort(
            (a, b) => a.timestamp.seconds - b.timestamp.seconds
        );
        setAnswer(oldest);
        setSortKey("oldest");
    };

    const sortByHighestVotes = () => {
        const f2 = answers.map(answer => {
            let filtered = votesAnswers.filter(
                vote => vote.answerId === answer.id
            );
            let sum = filtered.reduce((e, y) => e + y.vote, 0);
            return {...answer, voteSum: sum};
        });
        const byHighest = f2.sort((a, b) => b.voteSum - a.voteSum);
        setAnswer(byHighest);
        setSortKey("highest");
    };

    const sortByLowest = () => {
        const f2 = answers.map(answer => {
            let filtered = votesAnswers.filter(
                vote => vote.answerId === answer.id
            );
            let sum = filtered.reduce((e, y) => e + y.vote, 0);
            return {...answer, voteSum: sum};
        });
        const byLowest = f2.sort((a, b) => a.voteSum - b.voteSum);
        setAnswer(byLowest);
        setSortKey("lowest");
    };

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

    return (
        <div>
            {answers.filter(answer => answer.postIdRef === forumQuestion.postiD)
                .length === 0 ? null : (
                <SortAButtons
                    sortKey={sortKey}
                    sortByNewest={sortByNewest}
                    sortByOldest={sortByOldest}
                    sortByHighestVotes={sortByHighestVotes}
                    sortByLowest={sortByLowest}
                />
            )}
            {answers.length === 0 ? null : answer}
        </div>
    );
};

export default ShowAnswers;
