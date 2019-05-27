import React, {useState} from "react";

import UserInfo from "./postChildren/UserInfo";
import ForumQuestion from "./postChildren/ForumQuestion";
import ShowAnswer from "./postChildren/ShowAnswers";
import AnswerQuestion from "./postChildren/AnswerQuestion";

const Post = ({user, forumData, answers}) => {
    const [isAnswering, setIsAnswering] = useState(false);

    const showAnswerInput = () => {
        setIsAnswering(true);
    };
    const hideAnswerInput = () => {
        setIsAnswering(false);
    };

    return (
        <article className="post">
            <div className="post_container">
                <UserInfo forumData={forumData} />
                <ForumQuestion forumData={forumData} user={user} />
                <ShowAnswer user={user} forumQuestion={forumData} answers={answers} />
                <AnswerQuestion
                    user={user}
                    isAnswering={isAnswering}
                    showAnswerInput={showAnswerInput}
                    hideAnswerInput={hideAnswerInput}
                    forumData={forumData}
                />
            </div>
        </article>
    );
};

export default Post;
