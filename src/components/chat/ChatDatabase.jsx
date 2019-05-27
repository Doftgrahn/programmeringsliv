import React, {useState, useEffect} from "react";
import {initializeApp} from '../../shared/FirebaseMessaging';
import {database} from '../../shared/Firebase';
import collection from '../../shared/dbCollection'
import MessageLayout from './MessageLayout';
import SendMessages from './SendMessages';


const ChatDatabase = ({user}) => {
    let [messages, setMessages] = useState(null);

    useEffect(() => {
        let isSubscribed = true;
        const userCollection = database.collection(collection.messages);
        userCollection.onSnapshot(snapshot => {
            if (isSubscribed) {
                const list = [];
                snapshot.forEach(doc => {
                    let docData = doc.data();
                    let obj= {
                        id: doc.id,
                        user1: docData.user1,
                        user2: docData.user2,
                        user1Name: docData.user1Name,
                        user2Name: docData.user2Name,
                        messages: [],
                        senderUser: []
                    }
                    docData.messages.forEach(message => obj.messages.push(message));
                    docData.senderUser.forEach(send => obj.senderUser.push(send));
                    list.push(obj);

                });
                setMessages(list)
            }
            
        });
        return () => (isSubscribed = false);
    }, []);
    
    let displayMessages = null;
    if (messages) {
        displayMessages = messages
        .filter(message => message.user1 === user.uid || message.user2 === user.uid)
        .map( (message, index) => (<MessageLayout key={index} message={message} user={user}/>))
    }
    
    return (
        
        <div>
            <h1>Chat</h1>
            <button onClick={e => initializeApp(user)}>Klicka på mig</button>
            <div>
                {displayMessages? displayMessages : 'Waiting for server...'}
            </div>
            <div>
                <SendMessages user={user} />
            </div>
        </div>
    );
};

export default ChatDatabase;

