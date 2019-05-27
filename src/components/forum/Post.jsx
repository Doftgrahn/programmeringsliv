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
                <ForumQuestion forumData={forumData} />
                <ShowAnswer answers={answers} />

                <div className="post_container-answerWrapper">
                    <div className="post_container-answerWrapper-button">
                        <button onClick={showAnswerInput}>Answer</button>
                    </div>
                    <AnswerQuestion
                        user={user}
                        isAnswering={isAnswering}
                        hideAnswerInput={hideAnswerInput}
                        forumData={forumData}
                    />
                </div>
            </div>
        </article>
    );
};

export default Post;
