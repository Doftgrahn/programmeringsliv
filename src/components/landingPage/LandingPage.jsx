import React from "react";
import Homepage from './Homepage';
import UserHomepage from './UserHomepage';

const LandingPage = props => {
    return (
      <div className="outsideLBackground fade">
        <div className="backgroundL">
          <div className="contentL">
            <div className="firstBaner">
              {props.user
              ? <UserHomepage />
               : <Homepage logIn={props.logIn} />
              }
            </div>
          </div>
        </div>
      </div>
    );
};

export default LandingPage;
