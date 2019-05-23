import React from 'react';

const ForumQuestion = ({username, title, content, karma}) => {
    return (<div className="post_container-question">
        <p className="username">{username}</p>
        <h3 className="title">{title}</h3>
        <p className="content">{content}</p>
        <p className="votes">Votes: {karma}</p>
    </div>)
}

export default ForumQuestion;
