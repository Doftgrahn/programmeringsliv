import React from 'react';

const ForumQuestion = ({username, title, content, votes}) => {
    return (<div className="post_container-question">
        <h3 className="title">{title}</h3>
        <p className="content">{content}</p>
        <p className="votes">Votes: {votes}</p>
    </div>)
}

export default ForumQuestion;

//<p className="username">{username}</p>
