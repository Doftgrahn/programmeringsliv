import React from 'react';
import ContentLayout from './ContentLayout';

const MessageLayout = ({message, user}) => {
    let content = message.messages.map( (m, index) => <ContentLayout key={index} message={message} index={index} user={user} />)
    let sender = message.users.filter( usersInList => usersInList.id !== user.uid )
    let profilePic = <img src={sender[0].picture} alt="Profile user" className="chatProfilePic" />
    return (
       <div className="messageLayoutConversation">
           {sender? profilePic: '' }<h3>{sender? sender[0].username : 'Okänd'}</h3>
            {content}
       </div>
    );
     
}
export default MessageLayout;