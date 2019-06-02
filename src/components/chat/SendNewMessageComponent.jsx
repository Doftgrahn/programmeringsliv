import React from 'react';

const SendNewMessageComponent = ({renderSearch, listOfUsers, setMessage, sendMessage, sendToUser, sendMessageState}) => {
    let listContent = <div>
        <input type="text" placeholder="Search for user" onChange={e => renderSearch(e.target.value)}/>
        <ul>
            {listOfUsers}
        </ul>
    </div>;
    let sendMessageContent = <div className="chatNewMessageDiv">
        <textarea onChange={e => setMessage(e.target.value)} rows="4" cols="50"></textarea>
        <button className="chatButton" onClick={sendMessage}>Send to {sendToUser? sendToUser.userName:'användare'}</button>
    </div>;
    return(
        sendMessageState?sendMessageContent:listContent
        )
}
export default SendNewMessageComponent;