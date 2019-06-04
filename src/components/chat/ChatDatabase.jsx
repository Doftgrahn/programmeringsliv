import React, {useState, useEffect} from "react";
import {database} from '../../shared/Firebase';
import collection from '../../shared/dbCollection'
import MessageLayout from './MessageLayout';
import SendMessages from './SendMessages';


const ChatDatabase = ({user, switchNewMessageState}) => {
    let [messages, setMessages] = useState(null);
    
    useEffect(() => {
        if(user){
            let isSubscribed = true;
            const userCollection = database.collection(collection.messages).where('ids', 'array-contains', user.uid);
            let readMessages = 0;
            userCollection.onSnapshot(snapshot => { 
                if (isSubscribed) {
                    const list = [];
                    snapshot.forEach(doc => {
                        let docData = doc.data();
                        let obj= {
                            id: doc.id,
                            users: [],
                            messages: [],
                            lastUpdated: docData.lastUpdated.toDate()
                        }
                        docData.messages.forEach(message => obj.messages.push(message));
                        docData.users.forEach(user => obj.users.push(user));
                        readMessages += docData.messages.length;
                        list.push(obj);
                    });
                    setMessages(list)
                    localStorage.setItem('lastReadMessages', readMessages)
                    return () => (switchNewMessageState());
                }  
            });
            return () => (isSubscribed = false);
        }
    }, []);
    
    let displayMessages = null;
    if (messages) {
        displayMessages = messages.map( (message, index) => (<MessageLayout key={index} message={message} user={user} />))
    }
    let pageContent;
    if (user) {
        pageContent = 
        <div className="Chat">
            <div>
                <SendMessages user={user} />
            </div>
            <div className="ChatConversationWrapper">
                {displayMessages? displayMessages : <div className="loader"></div>}
            </div>
        </div>
    } else {
        pageContent = 
        <div className="userNotLoggedIn">
            <p className="">You need to login to see your messages.</p>
        </div>
    }
 
    return (
        <div>
            {pageContent}
        </div>
        
    );
};

export default ChatDatabase;

