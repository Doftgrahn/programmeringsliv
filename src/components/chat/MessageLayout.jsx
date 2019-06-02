import React, {useState} from 'react';
import ContentLayout from './ContentLayout';
import RespondInConversation from './RespondInConversation';


const MessageLayout = ({message, user}) => {
    let [displayFullConversation, setDisplayFullConversation] = useState(false);
    let content = message.messages.map( (m, index) => <ContentLayout key={index} message={message} index={index} user={user} />)
    let sender = message.users.filter( usersInList => usersInList.id !== user.uid )
    
    const switchLayout = () => {
        let status = displayFullConversation;
        setDisplayFullConversation(!status);
    }
    let profilePic = <img src={sender[0].picture} alt="Profile user" onClick={switchLayout} className="chatProfilePic" />
    return (
       <div className={displayFullConversation?"messageLayoutConversation ChatLayoutFullView": "messageLayoutConversation"}>
           {sender? profilePic: '' }<h3 onClick={switchLayout} >{sender? sender[0].username : 'Okänd'}</h3>
            {content}
           <RespondInConversation user={user} message={message} />
       </div>
    );
     
}
export default MessageLayout;