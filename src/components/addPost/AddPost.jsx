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
<<<<<<< HEAD
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
=======
    <div className="fade">
    <FormPost user={user}/>
>>>>>>> 21670eeb2403b8cb17110f7c34440b43668a31f3
    </div>
  )

}
export default AddPostPage;
