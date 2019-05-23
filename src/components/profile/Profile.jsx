import React from "react";

const Profile = ({user}) => {
    return (
      <div className="outsideBackground">
        <div className="background">
          <div className="content">
            <img
              src={!user.userPhotoURL ? "https://cdn.impactinit.com/cdn/x/x@ac8c3fd87c/smss53/smsimg28/pv/ingimagecontributors/ing_47129_07704.jpg" : user.userPhotoURL} 
              alt="avatarPic"
              className="avatar"
            />
            <div className="profileInfo">
              <div className="name">{!user.userName ? 'User Unknown' : user.userName}</div>
              <div className="email">{!user.userEmail ? 'email@gmail.com' : user.userEmail}</div>
            </div>
            <div className="extraProfileInfo">
              <span className="posts">{3} posts</span>
              <span className="karma">{0} karma points</span>
            </div>
            <div className="postWrapper">
                <div className="postDiv">
                    <div className="question">Some very interesting question about something that people in coding are intereted</div>
                    <div className="postMetadata">
                        <span className="date">19/05/23 16:45PM</span>
                        <span className="votes">{0} votes</span>
                    </div>
                </div>
                <div className="postDiv">
                    <div className="answer">Answer about some question. Some good explanations and some example. Maybe some code or something</div>
                    <div className="postMetadata">
                        <span className="date">19/05/26 10:17AM</span>
                        <span className="votes">{2} votes</span>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    );
};

export default Profile;
