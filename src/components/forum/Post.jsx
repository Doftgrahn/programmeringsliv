import React, {useState} from "react";

import UserInfo from './postChildren/UserInfo';

import ForumQuestion from './postChildren/ForumQuestion';

import AnswerQuestion from './postChildren/AnswerQuestion';

const Post = ({user, forumData}) => {
    const [username] = useState(forumData.username);
    const [title] = useState(forumData.title);
    const [content] = useState(forumData.content);
    const [karma] = useState(forumData.karma);
    //const [picture] = useState(forumData.picture);
    //const [timestamp] = useState(forumData.timestamp);
    const [isAnswering, setIsAnswering] = useState(false);

    const showAnswerInput = () => {
        console.log('hej', isAnswering);
        setIsAnswering(true)
    }
    const hideAnswerInput = () => {
        setIsAnswering(false)
    }

    return (<article className="post">
        {
            !user
                ? ''
                : (<div className="post_container">
                    <UserInfo user={user}/>
                    <ForumQuestion username={username} title={title} content={content} karma={karma}/>
                    <div className="post_container-answerWrapper">
                        <button onClick={showAnswerInput}>Answer</button>
                        <AnswerQuestion isAnswering={isAnswering} hideAnswerInput={hideAnswerInput}/>
                    </div>
                </div>)
        }
    </article>);
};

export default Post;
