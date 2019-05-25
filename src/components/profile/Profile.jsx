import React, {useState, useEffect} from "react";
import {database} from "../../shared/Firebase";
import Question from './Question';
import Answer from './Answer';

const Profile = ({user}) => {
  let userId; 
  if(user) {
    userId = user.uid;
  }
  
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState(null);

  useEffect(() => {
    const postCollection = database.collection('posts');
    postCollection.onSnapshot(snapshot => {
            const list = [];
            snapshot.forEach(doc => {
              //console.log(doc._document.proto.fields.timestamp.timestampValue);
                if(doc._document.proto.fields.userID.stringValue === userId) {
                  list.push(doc.data());
              }
            });
            setQuestions(list);
    });
  }, []);

  useEffect(() => {
    const answerCollection = database.collection('answer');
    answerCollection.onSnapshot(snapshot => {
            const list = [];
            snapshot.forEach(doc => {
              //console.log(doc._document.proto.fields.userId.stringValue);
             if(doc._document.proto.fields.userId.stringValue === userId) {
              list.push(doc.data());
              }
            });
            setAnswers(list);
    });
  }, []);

  let postsNumber = 0;
  let questionData;
  if (questions) {
    postsNumber += questions.length;
    questionData = questions.map((question, index) => (
      <Question key={index} question={question} />
    ))
  }

  let answerData;
  if (answers) {
    postsNumber += answers.length;
    answerData = answers.map((answer, index) => (
      <Answer key={index} answer={answer} />
    ))
  }

    return (
      <div className="outsideBackground">
        <div className="background">
          <div className="content">
            <img
              src={!user ? "https://cdn.impactinit.com/cdn/x/x@ac8c3fd87c/smss53/smsimg28/pv/ingimagecontributors/ing_47129_07704.jpg" : user.photoURL} 
              alt="avatarPic"
              className="avatar"
            />
            <div className="profileInfo">
              <div className="name">{!user ? 'User Unknown' : user.displayName}</div>
              <div className="email">{!user ? 'email@gmail.com' : user.email}</div>
            </div>
            <div className="extraProfileInfo">
              <span className="posts">{postsNumber} posts</span>
              <span className="karma">{0} karma points</span>
            </div>
            <div className="postWrapper">
            {!questionData ? <li>no question data</li> : questionData}
            {!answerData ? <li>no answer data</li> : answerData}
            </div>
          </div>
        </div>
      </div>
    );
};


export default Profile;
