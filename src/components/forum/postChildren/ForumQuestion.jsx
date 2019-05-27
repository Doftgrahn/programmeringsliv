import React, {useState} from "react";

import voteArrow from "../../../assets/icons/upVoteDownVote.svg";

const ForumQuestion = ({forumData}) => {
    const [isPictureVisible, setPictureVisible] = useState(false);
    const togglePicture = () => setPictureVisible(!isPictureVisible);

    const upVote = () => {
        console.log("upvote");
    };
    const downVote = () => {
        console.log("downVote");
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
