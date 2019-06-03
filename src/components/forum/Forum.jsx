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

    const sortByNewest = () => {
        const newest = forum.sort(
            (a, b) => b.timestamp.seconds - a.timestamp.seconds
        );
        setForum(newest);
        setSortKey("newest");
    };

    const sortByOldest = () => {
        const oldest = forum.sort(
            (a, b) => a.timestamp.seconds - b.timestamp.seconds
        );
        setForum(oldest);
        setSortKey("oldest");
    };

    const sortByHighestVotes = () => {
        const f2 = forum.map(post => {
            let filtered = pVotes.filter(vote => vote.postId === post.postiD);
            let sum = filtered.reduce((e, y) => e + y.vote, 0);
            return {...post, voteSum: sum};
        });
        const byHigest = f2.sort((a, b) => b.voteSum - a.voteSum);

        setForum(byHigest);
        setSortKey("highest");
    };

    let posts = forum.map(post => (
        <Post key={post.postiD} user={user} forumData={post} match={match} />
    ));

    return (
        <main className="forum fade">
            {forum.length === 0 ? null : (
                <div className="fBtn">
                    <button
                        onClick={sortByNewest}
                        disabled={sortKey === "newest" ? true : false}
                        className={sortKey === "newest" ? "activeBtn" : ""}
                    >
                        Newest
                    </button>
                    <button
                        onClick={sortByOldest}
                        disabled={sortKey === "oldest" ? true : false}
                        className={sortKey === "oldest" ? "activeBtn" : ""}
                    >
                        Oldest
                    </button>
                    <button
                        onClick={sortByHighestVotes}
                        disabled={sortKey === "highest" ? true : false}
                        className={sortKey === "highest" ? "activeBtn" : ""}
                    >
                        Highest Votes
                    </button>
                </div>
            )}

            {forum.length === 0 ? <div className="loader" /> : posts}
        </main>
    );
};

export default Forum;
