import React, {useState} from "react";

const Post = ({user, forumData}) => {
    const [title] = useState(forumData.title);
    const [content] = useState(forumData.content);
    console.log('This is user:', user);
    console.log('This is forumData', forumData);

    return (
        <article className="post">
            <div className="post_container">
                <h3>{title}</h3>
                <p>{content}</p>
            </div>
        </article>
    );
};

export default Post;
