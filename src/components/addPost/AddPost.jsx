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
    <div className="fade">
    <FormPost user={user}/>
    </div>
  )

}
export default AddPostPage;
