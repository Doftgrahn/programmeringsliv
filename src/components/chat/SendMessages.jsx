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
                <UserListItem key= {data.id} data={data} sendMessage={setSendToUserFunction}/>
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
        setMessageToUser(null);
        let idOnConversation = null;
        let conversation = null;
        const userCollection = database.collection(collection.messages).where('ids', 'array-contains', user.uid);
        userCollection.get().then(snapshot => {
            snapshot.forEach(doc => {
                let docData = doc.data();
                let isConversationTrue = docData.ids.filter(id => id === sendToUser.id);
                if(isConversationTrue.length > 0){
                    idOnConversation = doc.id;
                    conversation = docData;
                }
            })
            return sendAway(conversation, idOnConversation)
        })
    }
    const sendAway = (senderUserInfo, id) => {
        const userCollection = database.collection(collection.messages);
        if(id){
            senderUserInfo.messages.push({
                content: messageToUser,
                idSender: user.uid
            });
            userCollection.doc(id).update({
                messages: senderUserInfo.messages
            }).then(setSendToUser(null))
        } else {
            let obj = {
                ids: [user.uid, sendToUser.id],
                messages:[{content: messageToUser, idSender: user.uid}],
                users: [
                    {username: user.displayName, id: user.uid},
                    {username: sendToUser.userName, id: sendToUser.id}
                ]
            }
            userCollection.add(obj).then(setSendToUser(null))
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