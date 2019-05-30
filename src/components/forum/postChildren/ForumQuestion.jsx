import React, {useState, useEffect} from "react";

import {database} from "../../../shared/Firebase";

import collection from "../../../shared/dbCollection";

import voteArrow from "../../../assets/icons/upVoteDownVote.svg";

const ForumQuestion = ({user, forumData}) => {
    const [votePostId, setPostId] = useState([]);
    //const [whatVoted, setWhatVoted] = useState(null);

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

    let hasVoted;
    if (user) hasVoted = votePostId.find(post => post.userId === user.uid);

    const upVote = postData => {
        if (user && !hasVoted) {
            const votes = votePostId
                .filter(f => f.postId === forumData.postiD)
                .map(e => e.vote)
                .reduce((a, b) => a + b, 0);
                
            const vote = {
                userId: user.uid,
                postId: postData.postiD,
                vote: votes + 1
            };

            const votePathiD = `${vote.userId}_###_${vote.postId}`;
            const dbCollection = database
                .collection(collection.votes_posts)
                .doc(votePathiD);
            dbCollection
                .set(vote)
                .then(() =>
                    console.log(
                        "%c successfully upvoted ",
                        "background: #222; color: #bada55"
                    )
                );
        }
    };

    const downVote = postData => {
        if (user && !hasVoted) {
            const votes = votePostId
                .filter(f => f.postId === forumData.postiD)
                .map(e => e.vote)
                .reduce((a, b) => a + b, 0);

            const vote = {
                userId: user.uid,
                postId: postData.postiD,
                vote: votes - 1
            };
            const votePath = `${vote.userId}###${vote.postId}`;
            const dbCollection = database
                .collection(collection.votes_posts)
                .doc(votePath);
            dbCollection
                .set(vote)
                .then(() =>
                    console.log(
                        "%c successfully upvoted ",
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
        }
    };

    const filterVotes = votePostId;

    return (
        <div className="post_container-question">
            <h3 className="title">{forumData.title}</h3>
            <p className="content_c">{forumData.content}</p>
            <div className="votes-container">
                <img
                    onClick={() => upVote(forumData)}
                    className="upvote"
                    src={voteArrow}
                    alt="upvote"
                />
                <span className="votes">
                    Votes:
                    {filterVotes.length === 0
                        ? 0
                        : filterVotes.map(e => e.vote)}
                </span>
                <img
                    onClick={() => downVote(forumData)}
                    className="downVote"
                    src={voteArrow}
                    alt="DownVote"
                />
            </div>
            {user && forumData.userID === user.uid ? (
                <button
                    className="deleteButton"
                    onClick={() => deletePost(forumData)}
                >
                    Delete
                </button>
            ) : null}
            <button
                className={`showPictureBtn ${
                    forumData.pictureURL ? "show" : "hidden"
                }`}
                onClick={togglePicture}
            >
                {isPictureVisible ? "Hide Picture" : "Show picture"}
            </button>

            <div
                className={`postPicture-container ${
                    isPictureVisible ? "show" : "hidden"
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

/*
useEffect(() => {
    const vCollection = database.collection(collection.votes);
    vCollection.onSnapshot(snapshot => {
        const votesList = [];
        snapshot.forEach(doc => {
            votesList.push({...doc.data(), voteId: doc.id});
        });
        setVotes(votesList);
    });
}, []);
*/
