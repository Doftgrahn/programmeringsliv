import React, {useState, useEffect} from 'react';
import {database} from '../../shared/Firebase';
import collection from '../../shared/dbCollection'
import UserListItem from './UserListItem';

const SendMessages = ({user}) => {
    const [userData, setUserData] = useState(null);

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

    let list = null;
    const renderSearch = (search) => {
	    if( userData ) {
            list = userData
            .filter(name => name.userName.toLowerCase().includes(search.toLowerCase()))
            .map(name => (
                <UserListItem key= {name.id} name={name} user={user} />
            ));
        }
    }

    return (
        <div>
            <p>sendMessages work</p>
            <input type="text" onChange={e => renderSearch(e.target.value)}/>
            <ul>
                {list}
            </ul>
        </div>
    )
}
export default SendMessages