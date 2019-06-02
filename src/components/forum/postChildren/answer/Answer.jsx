import React, {useEffect, useState} from "react";
import {database} from "../../../../shared/Firebase";
import collection from "../../../../shared/dbCollection";
import voteArrow from "../../../../assets/icons/upVoteDownVote.svg";

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

    const upVote = answerData => {
        if (user && !hasVoted) {
            const votes = voteAnsweriD
                .map(e => e.vote)
                .reduce((a, b) => a + b, 0);
            const vote = {
                userId: user.uid,
                answerId: answerData.id,
                vote: votes + 1
            };
            const votePathiD = `${vote.userId}###${vote.answerId}`;
            const dbCollection = database
                .collection(collection.votes_answers)
                .doc(votePathiD);
            dbCollection
                .set(vote)
                .then(() =>
                    console.log(
                        "%c successfully upvoted ",
                        "background: #222; color: green"
                    )
                );
        }
    };

    const downVote = answerData => {
        if (user && !hasVoted) {
            const votes = voteAnsweriD
                .map(e => e.vote)
                .reduce((a, b) => a + b, 0);
            const vote = {
                userId: user.uid,
                answerId: answerData.id,
                vote: votes - 1
            };
            const votePathiD = `${vote.userId}###${vote.answerId}`;
            const dbCollection = database
                .collection(collection.votes_answers)
                .doc(votePathiD);
            dbCollection
                .set(vote)
                .then(() =>
                    console.log(
                        "%c successfully downvoted ",
                        "background: #222; color: red"
                    )
                );
        }
    };

    const deleteAnswer = data => {
        if (data.userId === user.uid) {
            const dbCollection = database.collection(collection.answer);
            dbCollection
                .doc(data.id)
                .delete()
                .then(() =>
                    console.log(
                        "%c Deleted Question",
                        "background: #222; color: red"
                    )
                );
            /*
            voteAnsweriD.forEach(e => {
                const anVoteCollection = database.collection(
                    collection.votes_answer
                );
                anVoteCollection
                    .doc(e.id)
                    .delete()
                    .then(() => {
                        console.log("%c Votes to answers deleted");
                    }).catch(error => console.log('Error', error))
            });*/
        }
    };

    return (
        <div className="answer">
            <div className="answer-container">
                <div className="answer-photo">
                    <img src={answer.photoURL} alt="userPhoto" />
                </div>
                <span>Username: {answer.username}</span>
                <span>
                    posted:
                    {date} {time}
                </span>
                <div className="vote">
                    <img
                        onClick={() => upVote(answer)}
                        className="upvote"
                        src={voteArrow}
                        alt="upvote"
                    />
                    <span>
                        votes:
                        {voteAnsweriD.length === 0
                            ? 0
                            : voteAnsweriD.map(e => e.vote)}
                    </span>
                    <img
                        onClick={() => downVote(answer)}
                        src={voteArrow}
                        alt="downVote"
                    />
                </div>

                <div className="answerAndDeletel-container">
                    <p>
                        Answer:
                        {answer.answer}
                    </p>
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
