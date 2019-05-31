import React from 'react';
import ContentLayout from './ContentLayout';

const MessageLayout = ({message, user}) => {
    let content = message.messages.map( (m, index) => <ContentLayout key={index} message={message} index={index} user={user} />)
    let sender = message.users.filter( usersInList => usersInList.id !== user.uid )
    return (
       <div className="messageLayoutConversation">
           <h3>Från {sender? sender[0].username : 'Okänd'}</h3>
            {content}
       </div>
    );
     
}
export default MessageLayout;