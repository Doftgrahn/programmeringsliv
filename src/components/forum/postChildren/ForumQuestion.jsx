import React, {useState, useEffect} from "react";

import {database} from "../../../shared/Firebase";
import collection from "../../../shared/dbCollection";

import voteArrow from "../../../assets/icons/upVoteDownVote.svg";

const ForumQuestion = ({user, forumData}) => {
    const [voteList, setVotes] = useState([]);
    const [isPictureVisible, setPictureVisible] = useState(false);

    const togglePicture = () => setPictureVisible(!isPictureVisible);

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

    const upVote = data => {
        const filterV = voteList
            .filter(v => v.postiDRef === data.postiD)
            .map(e => e.votes);

        const filterUser = voteList
            .filter(u => u.postiDRef === data.postiD)
            .map(us => us.userIdRef);

        const dbCollection = database
            .collection(collection.votes)
            .doc(data.postiD);
        dbCollection
            .set({
                userIdRef: [...filterUser, user.uid],
                postiDRef: data.postiD,
                votes: +filterV + 1
            })
            .then(() => console.log("Success"));
    };

    const deletePost = data => {
        if (data.userID === user.uid) {
            const dbCollection = database.collection(collection.post);
            dbCollection
                .doc(data.postiD)
                .delete()
                .then(() => console.log("deleted successfully"));
        }
    };

    const filterVotes = voteList.filter(
        vote => vote.postiDRef === forumData.postiD
    );

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
                    Votes:{" "}
                    {!filterVotes ? "ZERO" : filterVotes.map(e => e.votes)}
                </span>
                <img className="downVote" src={voteArrow} alt="DownVote" />
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
