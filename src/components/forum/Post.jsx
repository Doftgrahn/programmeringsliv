import React from "react";

import UserInfo from "./postChildren/UserInfo";
import ForumQuestion from "./postChildren/ForumQuestion";
import ShowAnswer from "./postChildren/ShowAnswers";
import AnswerQuestion from "./postChildren/AnswerQuestion";

const Post = ({user, forumData, answers}) => {
    return (
        <article className="post">
            <div className="post_container">
                <UserInfo forumData={forumData} />
                <ForumQuestion forumData={forumData} user={user} />
                {!user ? null : (
                    <AnswerQuestion user={user} forumData={forumData} />
                )}
                <ShowAnswer
                    user={user}
                    forumQuestion={forumData}
                    answers={answers}
                />

            </div>
        </article>
    );
};

export default Post;
