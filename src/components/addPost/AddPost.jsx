import React from "react";
import FormPost from "./FormPost"
import Writer from "./PostWriter"
import LastPosts from "./LastPosts"

const AddPostPage = ({user}) => {

  if(!user){
    return(
      <div id="notLoggedIn">
      <h2>Please, log in to write a post</h2>
      </div>
    )
  }

  return (
    <div className="wrapEverything">
      <h2>Add post</h2>
      <div className="mainGrid">
        <div className="writerProfile">
        <Writer user={user}/>
        </div>
        <div className="mainForm">
        <FormPost user={user}/>
        </div>
        <div className="lastPosts">
        <LastPosts/>
        </div>
      </div>
    </div>
  )

}
export default AddPostPage;
