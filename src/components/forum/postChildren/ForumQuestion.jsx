import React, {useState, useEffect} from "react";

import {database} from "../../../shared/Firebase";

import collection from "../../../shared/dbCollection";

import voteArrow from "../../../assets/icons/upVoteDownVote.svg";

import Upvote from "../../../shared/voteArrows/UpVote";
import DownVote from "../../../shared/voteArrows/DownVote";

const ForumQuestion = ({user, forumData, toggleAnswers, isAnVisible}) => {
    const [votePostId, setPostId] = useState([]);
    const [answers, setAnswers] = useState([]);

    const [isPictureVisible, setPictureVisible] = useState(false);

    const togglePicture = () => setPictureVisible(!isPictureVisible);

    useEffect(
        () => {
            const vCollection = database.collection(collection.votes_posts);
            let unsubscribe = vCollection
                .where("postId", "==", forumData.postiD)
                .onSnapshot(snapshot => {
                    const idList = [];
                    snapshot.forEach(doc => {
                        idList.push({...doc.data(), id: doc.id});
                    });
                    setPostId(idList);
                });
            return unsubscribe;
        },
        [forumData.postiD]
    );

    useEffect(
        () => {
            const aCollection = database.collection(collection.answer);
            let unsubscribe = aCollection
                .where("postIdRef", "==", forumData.postiD)
                .onSnapshot(snapshot => {
                    const aList = [];
                    snapshot.forEach(doc => {
                        aList.push({...doc.data(), id: doc.id});
                    });
                    setAnswers(aList);
                });
            return unsubscribe;
        },
        [forumData.postiD]
    );

    let hasVoted;
    if (user) hasVoted = votePostId.find(post => post.userId === user.uid);

    const willVote = (postData, value) => {
        if (user && !hasVoted) {
            const vote = {
                userId: user.uid,
                postId: postData.postiD,
                vote: value
            };

            const votePathiD = `${vote.userId}_###_${vote.postId}`;
            const dbCollection = database
                .collection(collection.votes_posts)
                .doc(votePathiD);
            dbCollection
                .set(vote)
                .then(() =>
                    console.log(
                        "%c successfully voted ",
                        "background: #222; color: #bada55"
                    )
                );
        }
    };

    const deletePost = data => {
        if (data.userID === user.uid) {
            const dbCollection = database.collection(collection.post);
            dbCollection
                .doc(data.postiD)
                .delete()
                .then(() => console.log("Deleted successfully"));

            answers.forEach(e => {
                const aCollection = database.collection(collection.answer);
                aCollection
                    .doc(e.id)
                    .delete()
                    .then(e => console.log("answers deleted"));
            });
            votePostId.forEach(e => {
                const vCollection = database.collection(collection.votes_posts);
                vCollection
                    .doc(e.id)
                    .delete()
                    .then(() => console.log("Deleted votes connected to post"));
            });
        }
    };

    /*if(hasVoted) {
    const voted = votePostId.filter(post => post.userId === user.uid).map(e=>e.vote);
    if(whatDidVote !== voted)
        setWhatDidVote(voted)
}*/
    const whatVoted = votePostId
        .filter(post => post.userId === user.uid)
        .map(e => e.vote)
        .join();

    return (
        <div className="post_container-question">
            <div className="title_container">
                <h3 className="title">{forumData.title}</h3>
            </div>
            <div className="content_c">
                <p className="content_c-content">{forumData.content}</p>
            </div>
            <div className="votes-container">
                <div onClick={() => willVote(forumData, 1)}>
                    {/*<img className="upvote" src={voteArrow} alt="upvote" />*/}
                    <Upvote whatVoted={whatVoted} />
                </div>
                <span className="votes">
                    Votes:
                    {votePostId.length === 0
                        ? 0
                        : votePostId
                              .map(e => e.vote)
                              .reduce((a, b) => a + b, 0)}
                </span>
                <div
                    className={whatVoted === "-1" ? "red" : ""}
                    onClick={() => willVote(forumData, -1)}
                >
                    {/*<img className="downVote" src={voteArrow} alt="DownVote" />*/}
                    <DownVote whatVoted={whatVoted} />
                </div>
                {user && forumData.userID === user.uid ? (
                    <button
                        className="deleteButton"
                        onClick={() => deletePost(forumData)}
                    >
                        <i className="fas fa-trash" />
                    </button>
                ) : null}
                {answers.length < 1 ? (
                    ""
                ) : (
                    <button className="showAnswers" onClick={toggleAnswers}>
                        {isAnVisible ? "Hide answers" : "Show answers"}
                    </button>
                )}
            </div>
            <div className="showpicture_wrapper">
                <button
                    className={`showPictureBtn ${
                        forumData.pictureURL ? "show" : "hidden"
                    }`}
                    onClick={togglePicture}
                >
                    {isPictureVisible ? (
                        <i
                            className={`fas fa-images ${
                                isPictureVisible ? "orange" : ""
                            }`}
                        />
                    ) : (
                        <i
                            className={`fas fa-images ${
                                !isPictureVisible ? "white" : ""
                            }`}
                        />
                    )}
                </button>
            </div>
            <div
                className={`postPicture-container ${
                    !isPictureVisible ? "show" : "hidden"
                }`}
            >
                {forumData.pictureURL ? (
                    <img
                        className="postPicture"
                        src={forumData.pictureURL}
                        alt="postPicture"
                    />
                ) : null}
            </div>
        </div>
    );
};

export default ForumQuestion;
