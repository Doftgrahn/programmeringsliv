import React, {useState} from "react";

import voteArrow from "../../../assets/icons/upVoteDownVote.svg";

const ForumQuestion = ({forumData}) => {
    const [isPictureVisible, setPictureVisible] = useState(false);

    const togglePicture = () => setPictureVisible(!isPictureVisible);

    return (
        <div className="post_container-question">
            <h3 className="title">{forumData.title}</h3>
            <p className="content_c">{forumData.content}</p>
            <button
                className={`showPictureBtn ${
                    forumData.pictureURL ? "show" : "hidden"
                }`}
                onClick={togglePicture}
            >
                {isPictureVisible ? "Hide Picture" : "Show picture"}
            </button>
            <div className="votes-container">
                <img className="upvote" src={voteArrow} alt="upvote" />
                <span className="votes">Votes: {forumData.votes}</span>
                <img className="downVote" src={voteArrow} alt="DownVote" />
            </div>

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
