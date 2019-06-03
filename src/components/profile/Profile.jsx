import React, {useState, useEffect} from "react";
import {database} from "../../shared/Firebase";
import Question from './Question';
import Answer from './Answer';


const Profile = ({user}) => {
  let postsNumber = 0;
  let userId;
  if(user) {
    userId = user.uid;
  }

  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [postsVotes, setPostsVotes] = useState(null);
  const [answerVotes, setAnswerVotes] = useState(null);

  useEffect(() => {
    let isSubscribed = true;
    const postCollection = database.collection('posts');
    postCollection.onSnapshot(snapshot => {
      if (isSubscribed) {
            const list = [];
            snapshot.forEach(doc => {
                if(doc.data().userID === userId) {
                  list.push(doc.data());
              }
            });
            setQuestions(list);
          }
    });
    return () => (isSubscribed = false);
  }, [userId, postsNumber]);

  useEffect(() => {
    let isSubscribed = true;
    const answerCollection = database.collection('answer');
    answerCollection.onSnapshot(snapshot => {
      if (isSubscribed) {
            const list = [];
            snapshot.forEach(doc => {
             if(doc.data().userId === userId) {
              list.push(doc.data());
              }
            });
            setAnswers(list);
          }
    });
    return () => (isSubscribed = false);
  }, [userId, postsNumber]);

  useEffect(() => {
    let isSubscribed = true;
    const votesPointsCollection = database.collection('votes_posts');
    votesPointsCollection.onSnapshot(snapshot => {
      if (isSubscribed) {
            const list = [];
            snapshot.forEach(doc => {
             if(doc.data().userId === userId) {
              list.push(doc.data());
              }
            });
            setPostsVotes(list);
          }
    });
    return () => (isSubscribed = false);
  }, [userId, postsNumber]);

  useEffect(() => {
    let isSubscribed = true;
    const answersPointsCollection = database.collection('votes_answers');
    answersPointsCollection.onSnapshot(snapshot => {
      if (isSubscribed) {
            const list = [];
            snapshot.forEach(doc => {
             if(doc.data().userId === userId) {
              list.push(doc.data());
              }
            });
            setAnswerVotes(list);
          }
    });
    return () => (isSubscribed = false);
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

  let karmaPoints;
  if (postsVotes) {
    let numberOfVotes = postsVotes.length;
    //console.log('number of question points: ', postsVotes.length);
    karmaPoints = postsNumber + numberOfVotes;
  }
  if (answerVotes) {
    let numberOfVotes = answerVotes.length;
    //console.log('number of answer points: ', answerVotes.length);
    karmaPoints = postsNumber + numberOfVotes;
  }

    return (
      <div className="outsideBackground fade">
        <div className="background">
          <div className="content">
            <div className="containerOfProfile">
            <div className="picContainer">
              <img
                src={!user ? "https://cdn.impactinit.com/cdn/x/x@ac8c3fd87c/smss53/smsimg28/pv/ingimagecontributors/ing_47129_07704.jpg" : user.photoURL}
                alt="avatarPic"
                className="avatar"
              />
            </div>
            <div className="profileInfoContainer">
            <div className="profileInfo">
              <div className="name">{!user ? 'User Unknown' : user.displayName}</div>
              <div className="email">{!user ? 'email@gmail.com' : user.email}</div>
            </div>
            <div className="extraProfileInfo">
              <span className="posts"><i className="far fa-comment"></i> {postsNumber} posts</span>
              <span className="karma"><i className="far fa-heart"></i> {karmaPoints} karma points</span>
            </div>
            </div>
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
