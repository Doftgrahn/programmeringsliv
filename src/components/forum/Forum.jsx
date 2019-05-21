import React from "react";

import Post from "./Post";

const Forum = ({user}) => {
    return (
        <main className="forum">
            <h1>Forum</h1>


            <Post user={user} />
        </main>
    );
};

export default Forum;
