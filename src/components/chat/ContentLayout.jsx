import React from 'react';

const ContentLayout = ({ message, user, index}) => {
    let content;
    if(user.uid === message.messages[index].idSender){
        content = <div className="messageLayoutUser"> {message.messages[index].content} </div>
    } else {
        content = <div className="messageLayoutSender"> {message.messages[index].content} </div>
    }
    return(
        content
    )
    
}
export default ContentLayout;