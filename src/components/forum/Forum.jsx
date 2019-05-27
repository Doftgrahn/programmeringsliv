import React, {useState, useEffect} from "react";
import {database} from "../../shared/Firebase";
import collection from "../../shared/dbCollection";
import Post from "./Post";

const Forum = ({user}) => {
    const [forum, setForum] = useState(null);
    const [answers, setAnswer] = useState(null);

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

        return () => (isSubscribed = false);
    }, []);

    useEffect(() => {
        let isSubscribed = true;
        const answerCollection = database.collection(collection.answer);
        answerCollection.onSnapshot(snapshot => {
            if (isSubscribed) {
                const list = [];
                snapshot.forEach(doc => {
                    list.push(doc.data());
                });
                setAnswer(list);
            }
        });
        return () => (isSubscribed = false);
    }, []);

    let posts;
    if (forum) {
        posts = forum.map((post, index) => (
            <Post
                key={` ${index}`}
                user={user}
                forumData={post}
                answers={answers}
            />
        ));
    }

    return (
        <main className="forum">
            {!forum ? <div className="loader" /> : posts}
        </main>
    );
};

export default Forum;
