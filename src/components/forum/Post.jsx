import React, {useState} from "react";

const Post = ({user, forumData}) => {
    const [username] = useState(forumData.username);
    const [title] = useState(forumData.title);
    const [content] = useState(forumData.content);
    const [karma] = useState(forumData.karma);
    const [picture] = useState(forumData.picture);
    //const [timestamp] = useState(forumData.timestamp);

    return (
        <article className="post">
            <div className="post_container">
                <div className="post_container-userInfo">
                    <img src={user.photoURL} alt="ProfilePic" />
                    <h3>{user.displayName}</h3>
                    <span>{user.email}</span>
                </div>
                <div className="post_container-question">
                    <p class="username">{username}</p>
                    <h3 class="title">{title}</h3>
                    <p class="content">{content}</p>
                    <p className="karma">Votes: {karma}</p>
                </div>
            </div>
        </article>
    );
};

export default Post;
