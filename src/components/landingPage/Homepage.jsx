import React from "react";

const Homepage = props => {
  let landingPageContent;
  if (!props.user) {
  landingPageContent = (<div className="landingPageContent">
  <div className="bannerHeader">WE HELP YOU FIND ANSWERS</div>
  <div className="bannerText">
    Don't wait any longer and join our question-answer network now!
  </div>
  <div className="logInButtons">
    <button className="logInBtn" onClick={props.logIn}>
      Log in
    </button>
    <button className="signUpBtn" onClick={props.logIn}>
      Sign up
    </button>
  </div>
  </div>);
  } else {
    landingPageContent = (
      <div className="bannerHeaderName">
        Welcome {props.user.displayName}
      </div>
    );
  }

  return (
    <div>
      <div className="landingBanner">
       {landingPageContent}
      </div>

      <div className="pageLandingInfo">
        <div className="singlePageInfoDiv">
          <i className="far fa-comments" />
          <h3>User forum</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            molestie justo et feugiat egestas. Nulla et porttitor est. Vivamus
            sodales vel mauris et consequat.{" "}
          </p>
        </div>
        <div className="singlePageInfoDiv">
          <i className="far fa-envelope" />
          <h3>Messaging</h3>
          <p>
            Ut viverra, ligula pellentesque condimentum egestas, libero risus
            auctor sapien, non fermentum nisi augue vel eros. Duis venenatis
            ornare velit, a facilisis odio euismod et.
          </p>
        </div>
        <div className="singlePageInfoDiv">
          <i className="far fa-user" />
          <h3>User profile</h3>
          <p>
            Quisque vehicula maximus ipsum non lacinia. Morbi molestie imperdiet
            odio sed molestie. Praesent urna augue, scelerisque a aliquam quis,
            laoreet sed ante.
          </p>
        </div>
        <div className="singlePageInfoDiv">
          <i className="far fa-question-circle" />
          <h3>Ask questions</h3>
          <p>
            Duis purus urna, sodales nec fermentum sed, laoreet at turpis. Nulla
            et porttitor est. Vivamus sodales vel mauris et consequat.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
