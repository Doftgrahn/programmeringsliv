import React from "react";

const Post = ({user}) => {
    return (
        <article className="post">
            {!user ? (
                "nothing to see"
            ) : (
                <div className="post_container">
                    <h2>Welcolme {user.displayName}</h2>
                    <img src={user.photoURL} alt="user" />
                </div>
            )}
        </article>
    );
};

export default Post;
