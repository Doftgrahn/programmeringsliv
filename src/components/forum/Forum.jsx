import React, {useState, useEffect} from "react";

import {database} from "../../shared/Firebase";

import collection from "../../shared/dbCollection";

import Post from "./Post";

const Forum = ({user}) => {
    const [forum, setForum] = useState(null);

    useEffect(() => {
        let isSubscribed = true;
        const userCollection = database.collection(collection.post);
        userCollection.onSnapshot(snapshot => {
            if (isSubscribed) {
                const list = [];
                snapshot.forEach(doc => {
                    list.push(doc.data());
                });
                setForum(list);
            }
        });

        return() => (isSubscribed = false);
    }, []);

    let posts;
    if (forum) {
        posts = forum.map((post, index) => (<Post key={`key: ${index}`} user={user} forumData={post}/>));
    }

    return (<main className="forum">
        <h1>Hello {
                !user
                    ? null
                    : user.displayName
            }</h1>
        <div>{
                !forum
                    ? null
                    : posts
            }</div>
    </main>);
};

export default Forum;
