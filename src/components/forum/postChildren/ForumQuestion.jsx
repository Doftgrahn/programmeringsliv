import React, {useState} from "react";

const ForumQuestion = ({forumData}) => {
    const [isPictureVisible, setPictureVisible] = useState(false);

    const togglePicture = () => setPictureVisible(!isPictureVisible);

    return (
        <div className="post_container-question">
            <p className="votes">Votes: {forumData.votes}</p>

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

//<p className="username">{username}</p>
