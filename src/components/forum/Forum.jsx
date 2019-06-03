import React, {useState, useEffect} from "react";
import {database} from "../../shared/Firebase";
import collection from "../../shared/dbCollection";
import Post from "./Post";

const Forum = ({user, match}) => {
    const [forum, setForum] = useState([]);
    const [pVotes, setpVotes] = useState([]);
    const [sortKey, setSortKey] = useState("");

    useEffect(() => {
        const userCollection = database.collection(collection.post);
        const unsubscribe = userCollection.onSnapshot(snapshot => {
            const list = [];
            snapshot.forEach(doc => {
                list.push({...doc.data(), postiD: doc.id});
            });
            setForum(list);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        const votePostCollection = database.collection(collection.votes_posts);
        const unsubscribe = votePostCollection.onSnapshot(snapshot => {
            const list = [];
            snapshot.forEach(doc => {
                list.push({...doc.data(), id: doc.id});
            });
            setpVotes(list);
        });
        return unsubscribe;
    }, []);


    let posts = forum.map(post => (
        <Post key={post.postiD} user={user} forumData={post} match={match} />
    ));

    return (
        <main className="forum fade">


            {forum.length === 0 ? <div className="loader" /> : posts}
        </main>
    );
};

export default Forum;



/*
    <select className="filter-options fade">
        <option />
        <option onClick={sortByNewest}>Newest</option>
        <option onClick={sortByHighestVotes}>
            Highest Votes
        </option>
        <option>Best</option>
    </select>



    const sortByNewest = () => {
        const newest = forum.sort(
            (a, b) => a.timestamp.seconds - b.timestamp.seconds
        );
        setForum(newest);
        setSortKey("newest");
    };
    const sortByHighestVotes = () => {
        const sortVotes = forum.filter(e => e.PostiD === pVotes.postId)
        console.log(sortVotes);

        const highestVotes = forum.sort((a, b) => a);
    };
*/
