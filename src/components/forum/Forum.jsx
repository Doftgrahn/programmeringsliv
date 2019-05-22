import React, {useState, useEffect} from "react";

import {database} from "../../shared/Firebase";
import collection from "../../shared/dbCollection";

import Post from "./Post";

const Forum = ({user}) => {
    const [forum, setForum] = useState(null);

    useEffect(() => {
        let isSubscribed = true;
        const userCollection = database.collection("Posts");
        userCollection.onSnapshot(snapshot => {
            if (isSubscribed) {
                let list = [];
                snapshot.forEach(doc => {
                    list.push(doc.data());
                });
                setForum(list);
            }
        });

        return () => (isSubscribed = false);
    }, []);

    let posts;
    if (forum) {
        posts = forum.map(post => (
            <Post key={post} user={user} forumData={post} />
        ));
    }

    return (
        <main className="forum">
            <h1>Hello {!user ? null : user.displayName}</h1>
            <div>{!forum ? <p>Loading..</p> : posts}</div>
        </main>
    );
};

export default Forum;
