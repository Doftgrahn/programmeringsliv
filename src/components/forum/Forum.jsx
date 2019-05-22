import React, {useState, useEffect} from "react";

import {database} from "../../shared/Firebase";
import collection from "../../shared/dbCollection";

import Post from "./Post";

const Forum = ({user}) => {
    const [forum, setForum] = useState(null);

    useEffect(() => {
        const userCollection = database.collection(collection.post);
        userCollection.onSnapshot(snapshot => {
            console.log("we got forum");
            let list = [];
            snapshot.forEach(doc => {
                list.push(doc);
            });
            setForum(list);
        });
    }, []);

    return (
        <main className="forum">
            <h1>Forum</h1>
            <Post user={user} />
        </main>
    );
};

export default Forum;
