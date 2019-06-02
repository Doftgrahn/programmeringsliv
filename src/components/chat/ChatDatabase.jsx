import React, {useState, useEffect} from "react";
import {initializeApp} from '../../shared/FirebaseMessaging';
import {database} from '../../shared/Firebase';
import collection from '../../shared/dbCollection'
import MessageLayout from './MessageLayout';
import SendMessages from './SendMessages';


const ChatDatabase = ({user}) => {
    let [messages, setMessages] = useState(null);

    useEffect(() => {
        if(user){
            let isSubscribed = true;
            const userCollection = database.collection(collection.messages).where('ids', 'array-contains', user.uid);
            userCollection.onSnapshot(snapshot => { 
                if (isSubscribed) {
                    const list = [];
                    snapshot.forEach(doc => {
                        let docData = doc.data();
                        let obj= {
                            id: doc.id,
                            users: [],
                            messages: [],
                        }
                        docData.messages.forEach(message => obj.messages.push(message));
                        docData.users.forEach(user => obj.users.push(user));
                        list.push(obj);
                        
                    });
                    setMessages(list)
                }  
            });
            return () => (isSubscribed = false);
        }
    }, [user]);
    
    let displayMessages = null;
    if (messages) {
        displayMessages = messages.map( (message, index) => (<MessageLayout key={index} message={message} user={user}/>))
    }
    
    return (
        <div className="Chat">
            <div>
                <SendMessages user={user} />
            </div>
            <div className="ChatConversationWrapper">
                {displayMessages? displayMessages : <div className="loader"></div>}
            </div>
            <button className="chatButton" onClick={initializeApp}>Activate push-messages and recieve the latest news</button>
        </div>
    );
};

export default ChatDatabase;

