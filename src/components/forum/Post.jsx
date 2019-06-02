import React, {useState} from "react";

import UserInfo from "./postChildren/UserInfo";
import ForumQuestion from "./postChildren/ForumQuestion";
import ShowAnswer from "./postChildren/ShowAnswers";
import AnswerQuestion from "./postChildren/AnswerQuestion";

const Post = ({user, forumData, match}) => {
    const [isAnVisible, setIsAnVisible] = useState(false);

    const toggleAnswers = () => {
        setIsAnVisible(!isAnVisible);
    };

    return (
        <article className="post">
            <div className="post_container">
                <UserInfo forumData={forumData} />
                <ForumQuestion
                    forumData={forumData}
                    user={user}
                    toggleAnswers={toggleAnswers}
                />
                {!isAnVisible ? null : (
                    <ShowAnswer user={user} forumQuestion={forumData} />
                )}
                {!user ? null : (
                    <AnswerQuestion user={user} forumData={forumData} />
                )}
            </div>
        </article>
    );
};

export default Post;
