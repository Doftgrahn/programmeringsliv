import React from 'react';

const ContentLayout = ({ m, message, user, index}) => {
    let content;
    if(user.uid === message.senderUser[index]){
        content += <div class="messageLayoutUser"> {m} </div>
    } else {
        content += <div class="messageLayoutSender"> {m} </div>
    }
    return(
        {content}
    )
    
}
export default ContentLayout;