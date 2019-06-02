import React from "react";
import FormPost from "./FormPost"

const AddPostPage = ({user}) => {

  return (
    <div className="fade">
    <FormPost user={user}/>
    </div>
  )

}
export default AddPostPage;
