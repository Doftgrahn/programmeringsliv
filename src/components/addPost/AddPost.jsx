    import React, { Component} from "react";
import FileUploader from "react-firebase-file-uploader";
import Firebase from "firebase";
 

import * as firebase from "firebase/app";


class AddPostPage extends Component {

  state = {
    title: "",
    content: "",
    picture: "",
    timestamp: "",
    isUploading: false,
    progress: 0,
    pictureURL: "",
    postSent: false
  };

  handleChangeTitle = event =>
    this.setState({ title: event.target.value });
  handleChangeContent = event =>
    this.setState({ content: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ picture: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("picture")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ pictureURL: url }));
  };
    SubmitPost = () => {
    firebase.firestore().collection('posts').add({
       userID: this.props.user.uid,
       username: this.props.user.displayName,
       profilePic: this.props.user.photoURL,
       votes:0,
      title: this.state.title,
      content: this.state.content,
      picture: this.state.picture,
      pictureURL: this.state.pictureURL,
      timestamp: new Date()
    }).then(()=> this.setState({postSent: true}))

    //get url from the pic in storage
  }

  render() {

    if(!this.state.postSent){
      return (
          <div>
            <h1>Add post</h1>
            <form>
            <label>Title:</label>
            <input
            type="text"
            value={this.state.title}
            name="title"
            onChange={this.handleChangeTitle}
            /><br/>
            <label>Your question:</label>
            <textarea
            type="text"
            value={this.state.content}
            name="content"
            onChange={this.handleChangeContent}>
            </textarea><br/>
            <label>Picture:</label>
            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
            {this.state.pictureURL && <img src={this.state.pictureURL}alt="pictureURL" />}
            <FileUploader
            accept="picture/*"
            name="picture"
            randomizeFilename
            storageRef={firebase.storage().ref("picture")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
            /><br/>
            </form>
            <button onClick={this.SubmitPost} className="SubmitPost">Post</button>
          </div>
      )
    } else {
        return (
          <div>
          <h2>You post has been successfully sent!</h2>
          </div>
        )
      }
    }
}


export default AddPostPage;
