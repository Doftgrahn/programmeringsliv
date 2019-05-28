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