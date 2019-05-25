import React from "react";
import questionMark from '../../question-mark.png';

const LandingPage = props => {
    return (
      <div className="outsideLBackground">
        <div className="backgroundL">
        <img alt="pic" src={questionMark} className="questionPicture" />
          <div className="contentL">
            <div className="firstBaner">
              <div className="banerHeader">WE HELP YOU FIND ANSWERS</div>
              <div className="bannerText">
                Don't wait any longer and join our question-answer network
                now!
              </div>
              <button className="logInBtn">Log in</button>
              <button className="signUpBtn">Sign up</button>
            </div>
          </div>
        </div>
        <div className="moreAboutUs bg">
            <div className="randomText">Something else about the page</div>
        </div>
        <div className="moreAboutUs bg2">
            <div className="randomText">Something else about the page</div>
        </div>
      </div>
    );
};

export default LandingPage;
