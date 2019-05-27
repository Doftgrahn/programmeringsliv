import React from 'react';
import ContentLayout from './ContentLayout';

const MessageLayout = ({message, user}) => {
    let content = message.messages.map( (m, index) => <ContentLayout key={index} m={m} message={message} index={index} user={user} />)
    
    return (
       <div>
           <h3>Från {user.displayName === message.user1Name? message.user2Name : message.user1Name}</h3>
            {content}
       </div>
    );
     
}
export default MessageLayout;