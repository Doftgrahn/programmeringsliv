import React from "react";

const ForumQuestion = ({username, title, content, votes, picture}) => {
    return (
        <div className="post_container-question">
            <h3 className="title">{title}</h3>
            <p className="content_c">{content}</p>
            <div className="postPicture-container">
                {picture ? (
                    <img
                        className="postPicture"
                        src={picture}
                        alt="postPicture"
                    />
                ) : null}
            </div>
            <p className="votes">Votes: {votes}</p>
        </div>
    );
};

export default ForumQuestion;

//<p className="username">{username}</p>
