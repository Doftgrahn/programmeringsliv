import React from "react";
import Homepage from './Homepage';

const LandingPage = props => {
    return (
      <div className="outsideLBackground fade">
        <div className="backgroundL">
          <div className="contentL">
            <div className="firstBaner">
              <Homepage logIn={props.logIn} user={props.user}/>
            </div>
          </div>
        </div>
      </div>
    );
};

export default LandingPage;
