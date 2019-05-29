import React, { useState, useEffect } from "react";
import * as firebase from "firebase/app";

const LastPosts = () => {
  const db = firebase.firestore();
  const [postsData, setPostsData] = useState(null);


  useEffect(() => {
    const listOfPosts = db.collection('posts').orderBy("timestamp", "desc").limit(5);
    listOfPosts.onSnapshot(snapshot => {
      const list = [];
      snapshot.forEach(doc=> {
        list.push({id: doc.id, ...doc.data()})
      });
      console.log('fetched posts: ', list)
      setPostsData(list)
    });

  }, []);

  let allPosts = null;

  if(postsData!=null) {
    allPosts = postsData.map(post=> {
      let date = post.timestamp.toDate().toLocaleDateString();
      let time = post.timestamp.toDate().toLocaleTimeString();
      return(
        <div key={post.id} className="container">
          <div className="question">{post.title}</div>
          <div className="questionContent">{post.content}</div>
          <div className="username">{post.username}</div>
          <div className="postMetadata">{date} {time}</div>
        </div>
      )
    })
  }

  return (
    <div>
    <h3>Last 5 posts:</h3>
    <div>{allPosts}</div>
    </div>
  )

}
export default LastPosts;
