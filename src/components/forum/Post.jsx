import React, {useState} from "react";

const Post = ({user, forumData}) => {
    const [username] = useState(forumData.username);
    const [title] = useState(forumData.title);
    const [content] = useState(forumData.content);
    const [karma] = useState(forumData.karma);
    //const [picture] = useState(forumData.picture);
    //const [timestamp] = useState(forumData.timestamp);

    return (<article className="post">
        {
            !user
                ? ''
                : (<div className="post_container">
                    <div className="post_container-userInfo">
                        <img src={user.photoURL} alt="ProfilePic"/>
                        <h3>{user.displayName}</h3>
                        <span>{user.email}</span>
                    </div>
                    <div className="post_container-question">
                        <p className="username">{username}</p>
                        <h3 className="title">{title}</h3>
                        <p className="content">{content}</p>
                        <p className="votes">Votes: {karma}</p>
                    </div>
                    <div className="post_container-answerContainer">
                        <button>Answer</button>
                    </div>
                </div>)
        }
    </article>);
};

export default Post;
