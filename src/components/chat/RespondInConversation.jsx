import React, {useState} from 'react';
import pic from '../../assets/icons/icons8-paper-plane-26.png'
import {database} from '../../shared/Firebase';
import collection from '../../shared/dbCollection'

const RespondInConversation = ({user, message}) => {
    const [RespondingMessage, setMessage] = useState('');
    const enterMessage = (value) => {
        setMessage(value);
    }
    const sendResponse = () => {
        const userCollection = database.collection(collection.messages).doc(message.id);
        userCollection.get().then(function(doc) {
            if(doc.exists){
                let document = doc.data().messages;
                document.push({content: RespondingMessage, idSender: user.uid});
                return userCollection.update({
                    messages: document
                }).then(setMessage(''));
            }
        })
    }
    return(
        <div className="chatRespondDiv">
            <input className="chatInputRespond" type="text" value={RespondingMessage} onChange={e => enterMessage(e.target.value)} />
            <button className="chatButton chatRespondButton" onClick={sendResponse} disabled={!RespondingMessage}><img src={pic} alt="send" /></button>
        </div>
    )
}
export default RespondInConversation;