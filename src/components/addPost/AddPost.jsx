import React, { Component } from "react";
import Firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import * as firebase from "firebase/app";
import firebaseConfig from "./../../shared/firebaseConfig";


class AddPostPage extends Component {
  state = {
    userID: "",
    username: "",
    title: "",
    content: "",
    picture: "",
    isUploading: false,
    progress: 0,
    pictureURL: ""
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

  render() {
    return (
      <div>
        <h1>Addpost</h1>
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
          {this.state.pictureURL && <img src={this.state.pictureURL} />}
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
          <button>Post</button>
        </form>
      </div>
    );
  }
}

export default AddPostPage;

// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read, write: if request.auth != null;
//     }
//   }
// }
