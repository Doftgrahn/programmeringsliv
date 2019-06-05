import React, {useEffect, useState} from "react";
import {database} from "../../../../shared/Firebase";
import collection from "../../../../shared/dbCollection";

import Upvote from "../../../../shared/voteArrows/UpVote";
import DownVote from "../../../../shared/voteArrows/DownVote";

const Answer = ({answer, forumQuestion, user}) => {
    const [voteAnsweriD, setVoteAnswerId] = useState([]);
    let date = answer.timestamp.toDate().toLocaleDateString();
    let time = answer.timestamp.toDate().toLocaleTimeString();

    useEffect(
        () => {
            const vCollection = database.collection(collection.votes_answers);
            let unsubscribe = vCollection
                .where("answerId", "==", answer.id)
                .onSnapshot(snapshot => {
                    const idList = [];
                    snapshot.forEach(doc => {
                        idList.push({...doc.data(), id: doc.id});
                    });
                    setVoteAnswerId(idList);
                });
            return unsubscribe;
        },
        [answer.id]
    );

    let hasVoted;
    if (user)
        hasVoted = voteAnsweriD.find(answer => answer.userId === user.uid);

    const willVote = (answerData, value) => {
        if (user && !hasVoted) {
            /*const votes = voteAnsweriD
                .map(e => e.vote)
                .reduce((a, b) => a + b, 0);*/
            const vote = {
                userId: user.uid,
                answerId: answerData.id,
                vote: value
            };
            const votePathiD = `${vote.userId}###${vote.answerId}`;
            const dbCollection = database
                .collection(collection.votes_answers)
                .doc(votePathiD);
            dbCollection
                .set(vote)
                .then(() =>
                    console.log(
                        "%c successfully voted ",
                        "background: #222; color: green"
                    )
                );
        }
    };

    const deleteAnswer = data => {
        console.log(data.id)
        if (data.userId === user.uid) {
            const dbCollection = database.collection(collection.answer);
            dbCollection
                .doc(data.id)
                .delete()
                .then( secondCallback(data.id));       
        };
    };
    const secondCallback = (id) => {
        if (id) {
            let secondCall = database.collection(collection.votes_answers).where('answerId', '==', id);
                secondCall
                    .get()
                    .then(function (snapshot) {
                        snapshot.forEach(function(doc) {
                            database.collection(collection.votes_answers).doc(doc.id).delete()
                        })
                     }) 
        }
               
    };
            /*

            voteAnsweriD.forEach(e => {
                const anVoteCollection = database.collection(
                    collection.votes_answers
                );
                anVoteCollection
                    .doc(e.id)
                    .delete()
                    .then(() => {
                        console.log("%c Votes to answers deleted");
                    }).catch(error => console.log('Error', error))
            });*/
        

    let whatVoted;
    if (user)
        whatVoted = voteAnsweriD
            .filter(ans => ans.userId === user.uid)
            .map(e => e.vote)
            .join();

    return (
        <div className="answer">
            <div className="answer-container">
                <div className="answer-photo">
                    <img src={answer.photoURL} alt="userPhoto" />
                </div>
                <div className="user_container">
                    <span>{answer.username}</span>
                    <span>
                        {date} {time}
                    </span>
                </div>
                <div className="vote">
                    <div
                        className={whatVoted === "1" ? "blue" : ""}
                        onClick={() => willVote(answer, 1)}
                    >
                        <Upvote whatVoted={whatVoted} />
                    </div>
                    <span>
                        votes:
                        {voteAnsweriD.length === 0
                            ? 0
                            : voteAnsweriD
                                  .map(e => e.vote)
                                  .reduce((a, b) => a + b, 0)}
                    </span>
                    <div
                        className={whatVoted === "-1" ? "red" : ""}
                        onClick={() => willVote(answer, -1)}
                    >
                        <DownVote whatVoted={whatVoted} />
                    </div>
                </div>

                <div className="answerAndDeletel-container">
                    <p>{answer.answer}</p>
                    {user && answer.userId === user.uid ? (
                        <button
                            className="deleteButton"
                            onClick={() => deleteAnswer(answer)}
                        >
                            <i className="fas fa-trash" />
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Answer;
