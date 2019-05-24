import React, {useState} from "react";

import UserInfo from "./postChildren/UserInfo";
import ForumQuestion from "./postChildren/ForumQuestion";
import ShowAnswer from "./postChildren/ShowAnswers";
import AnswerQuestion from "./postChildren/AnswerQuestion";

const Post = ({user, forumData, answers}) => {
    const [username] = useState(forumData.username);
    const [title] = useState(forumData.title);
    const [content] = useState(forumData.content);
    const [votes] = useState(forumData.votes);
    //const [picture] = useState(forumData.picture);
    //const [timestamp] = useState(forumData.timestamp);
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
                <ForumQuestion
                    username={username}
                    title={title}
                    content={content}
                    votes={votes}
                />
                <ShowAnswer answers={answers} />

                <div className="post_container-answerWrapper">
                    <div className="post_container-answerWrapper-button">
                        <button onClick={showAnswerInput}>Answer</button>
                    </div>
                    <AnswerQuestion
                        user={user}
                        isAnswering={isAnswering}
                        hideAnswerInput={hideAnswerInput}
                    />
                </div>
            </div>
        </article>
    );
};

export default Post;
