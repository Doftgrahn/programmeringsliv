import React from "react";

const ForumQuestion = ({forumData}) => {
    return (
        <div className="post_container-question">
            <p className="votes">Votes: {forumData.votes}</p>

            <h3 className="title">{forumData.title}</h3>
            <p className="content_c">{forumData.content}</p>

            <div className="postPicture-container">
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
