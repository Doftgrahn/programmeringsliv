import React, { Component } from "react";
import * as firebase from "firebase/app";

const db = firebase.firestore();

class LastPosts extends Component {
  state = {
    posts: []
  }

  fetchPosts = () => {
    const query = db.collection('posts').orderBy("timestamp", "desc").limit(5);
    query.get()
    .then(snapshot => {
      const posts = snapshot.docs.map((doc)=> {
        return {id: doc.id, ...doc.data()}
      })
      console.log('fetched posts: ', posts)
      this.setState({posts: posts})
    })

  }


  render = () => {

    return (
      <div>{this.state.posts}</div>
    )
  }
}
export default LastPosts;
