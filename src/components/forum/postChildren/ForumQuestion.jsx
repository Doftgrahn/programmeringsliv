import React, {useState} from "react";

import {database} from "../../../shared/Firebase";
import collection from "../../../shared/dbCollection";

import voteArrow from "../../../assets/icons/upVoteDownVote.svg";

const ForumQuestion = ({user, forumData}) => {
    const [isPictureVisible, setPictureVisible] = useState(false);
    const togglePicture = () => setPictureVisible(!isPictureVisible);

    const upVote = () => {
        console.log("upvote");
    };
    const downVote = () => {
        console.log("downVote");
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

    return (
        <div className="post_container-question">
            <h3 className="title">{forumData.title}</h3>
            <p className="content_c">{forumData.content}</p>
            <div className="votes-container">
                <img
                    onClick={upVote}
                    className="upvote"
                    src={voteArrow}
                    alt="upvote"
                />
                <span className="votes">Votes: {forumData.votes}</span>
                <img
                    onClick={downVote}
                    className="downVote"
                    src={voteArrow}
                    alt="DownVote"
                />
            </div>
            {forumData.userID === user.uid ? (
                <button className="deleteButton" onClick={() => deletePost(forumData)}>
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

//username, title, content, votes, picture
