import React from "react";
import FormPost from "./FormPost"
import Writer from "./PostWriter"
import LastPosts from "./LastPosts"

const AddPostPage = ({user}) => {

  return (
    <div className="wrapper">
      <h1>Add post</h1>
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
  )

}
export default AddPostPage;
