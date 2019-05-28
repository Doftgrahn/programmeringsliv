import React, {useState, useEffect} from 'react';
import {database} from '../../shared/Firebase';
import collection from '../../shared/dbCollection'
import UserListItem from './UserListItem';

const SendMessages = ({user}) => {
    const [userData, setUserData] = useState(null);
    const [list, setList] = useState(null);
    const [sendMessageState, setSendMessageState] = useState(false);
    const [sendToUser, setSendToUser] = useState(null);
    const [messageToUser, setMessageToUser] = useState('');

    useEffect(() => {
        let isSubscribed = true;
        const userCollection = database.collection(collection.user);
        userCollection.onSnapshot(snapshot => {
            if (isSubscribed) {
                const list = [];
                snapshot.forEach(doc => {
                    let docData = doc.data();
                    list.push(docData);
                });
                setUserData(list)
            }
        });
        return () => (isSubscribed = false);
    }, []);

    const renderSearch = (search) => {
	    if( userData ) {
            setList(userData
            .filter(data => data.userName.toLowerCase().includes(search.toLowerCase()))
            .map(data => (
                <UserListItem key= {data.id} data={data} user={user} sendMessage={setSendToUserFunction}/>
            )))
        }
    }
    const setSendToUserFunction = (value) => {
        setSendMessageState(true);
        setSendToUser(value);
    }
    const setMessage = (value) => {
        setMessageToUser(value);
    }
    const sendMessage = () => {
        setSendMessageState(false);
        setSendToUser(null);
        setMessageToUser(null);
        const userCollection = database.collection(collection.messages);
        let idOnConversation = null;
        let conversation = null;
        userCollection.get().then(snapshot => {
            snapshot.forEach(doc => {
                let docData = doc.data();
                if(docData.user1 === user.uid || docData.user2 === user.uid) {
                    if (docData.user1 === sendToUser.id || docData.user2 === sendToUser.id){
                        idOnConversation = doc.id;
                        conversation = docData;
                    }
                }
            })
            return sendAway(conversation, idOnConversation)
        })
    }
    const sendAway = (senderUserVar, id) => {
        const userCollection = database.collection(collection.messages);
        if(id){
            senderUserVar.messages.push(messageToUser);
            senderUserVar.senderUser.push(user.uid);
            userCollection.doc(id).set({
                user1: user.uid,
                user1Name: user.displayName,
                user2: sendToUser.id,
                user2Name: sendToUser.userName,
                messages: senderUserVar.messages,
                senderUser: senderUserVar.senderUser
            }).then(console.log('meddelandet skickat'))
        } else {
            let obj = {
                user1: user.uid,
                user1Name: user.displayName,
                user2: sendToUser.id,
                user2Name: sendToUser.userName,
                messages: [messageToUser],
                senderUser: [user.uid]
            }
            userCollection.add(obj).then(console.log('meddelandet tillagt'))
        }
    }
    let listContent =  
        <div>
            <input type="text" onChange={e => renderSearch(e.target.value)}/>
            <ul>
                {list}
            </ul>
        </div>;
    let sendMessageContent = 
    <div>
        <textarea onChange={e => setMessage(e.target.value)} rows="4" cols="50"></textarea>
        <button onClick={sendMessage}>Skicka till {sendToUser? sendToUser.userName:'användare'}</button>
    </div>;
    return (
        <div>
            <p>sendMessages</p>
            {sendMessageState? sendMessageContent:listContent}
        </div>
    )
}
export default SendMessages