import React, {useState, useEffect} from "react";
import {database} from "../../shared/Firebase";
import Question from './Question';
import Answer from './Answer';

/*PROBLEMS TO FIX:
-Connect karma points
-Write out timestamp data to the posts. {question.timestamp.toDate()} doesnt work
  and gives memory problems that causes app to crash
*/
const Profile = ({user}) => {
  let postsNumber = 0;
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
              //console.log(doc._document.proto.fields.userID.stringValue);
                if(doc.data().userID === userId) {
                  list.push(doc.data());
              }
            });
            setQuestions(list);
    });
  }, [userId, postsNumber]);

  useEffect(() => {
    const answerCollection = database.collection('answer');
    answerCollection.onSnapshot(snapshot => {
            const list = [];
            snapshot.forEach(doc => {
              console.log(doc);
              //console.log(doc._document.proto.fields.userId.stringValue);
             if(doc.data().userId === userId) {
              list.push(doc.data());
              }
            });
            setAnswers(list);
    });
  }, [userId, postsNumber]);


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
              <span className="posts"><i className="far fa-comment"></i> {postsNumber} posts</span>
              <span className="karma"><i className="far fa-heart"></i> {0} karma points</span>
            </div>
            <div className="postWrapper">
            {!questionData ? <div>no question data</div> : questionData}
            {!answerData ? <div>no answer data</div> : answerData}
            </div>
          </div>
        </div>
      </div>
    );
};


export default Profile;
