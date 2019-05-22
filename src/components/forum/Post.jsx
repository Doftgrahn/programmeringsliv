import React from "react";

const Post = ({user, forumData}) => {
    return (
        <article className="post">
            <div className="post_container">
                <h3>{forumData.title}</h3>
                <p>{forumData.content}</p>
            </div>
        </article>
    );
};

export default Post;
