import React, { Component} from "react";
import FileUploader from "react-firebase-file-uploader";
import * as firebase from "firebase/app";

class FormPost extends Component {
  state = {
    votes: 0,
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
    }).then(()=> this.setState({postSent: true}));

    //get url from the pic in storage
  }

  BackToForm = () => {
    this.setState({
      postSent: false,
      title: '',
      content: '',
      picture: '',
      pictureURL: '',
      isUploading: false
    });
  }

  showImage = (url) => {
    if (!url) {
      return
    }

    return (
      <div>
      <img className="uploadedImage" src={url} alt="" />
      <button className="btns" onClick={this.cancelImage}>Delete</button>
      </div>
    )
  }

  cancelImage = (url) => {
    this.setState({
        isUploading: false,
        picture: "",
        pictureURL: ""
    })
  }

  render() {
    if(!this.state.postSent){
      return (
          <div className="formWrapper">
            <div id="newForm">
            <div>
            <label className="labels">Title:</label><br/>
            <input
            className="inputs"
            type="text"
            value={this.state.title}
            name="title"
            onChange={this.handleChangeTitle}
            /></div><br/>
            <div>
            <label className="labels">Your question:</label><br/>
            <textarea
            className="inputs"
            type="text"
            value={this.state.content}
            name="content"
            onChange={this.handleChangeContent}>
            </textarea></div><br/>
            <div className="pictureUpload">
            <label className="labels">Picture:</label><br/>
            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
            {this.showImage(this.state.pictureURL)}
            <FileUploader
            className="inputs"
            accept="picture/*"
            name="picture"
            randomizeFilename
            storageRef={firebase.storage().ref("picture")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
            /></div><br/>
            </div>
            <div className="submitBtn">
            <button onClick={this.SubmitPost} className="btns">Post</button>
            </div>
          </div>
      )

    } else {
        return (
          <div className="message">
          <h2>You post has been successfully sent!</h2>
          <div id="newPost">
          <button onClick={this.BackToForm} className="btns">New post</button>
          </div>
          </div>
        )
      }

    }
}

export default FormPost;
