import React from "react";

const Footer = () => {
    return (
      <footer>
        <div className="footerContacts">
          <div className="map">
            <h2>Visit us here!</h2>
            <div className="mapouter">
                <div className="gmap_canvas">

                </div>
            </div>
          </div>
          <div className="info">
            <img src="https://www.ecutbildning.se/wp-content/themes/ec-web/assets/ec-logo-mono.svg" alt="ec-loggo"/>
            <h3 className="boldP"> This website was brought to you by: </h3>
            <p> Ieva Lundin </p>
            <p> Eva Fireborn </p>
            <p> Olga Tselyuk </p>
            <p> Simon Grahn </p>
          </div>
        </div>
      </footer>
    );
};

export default Footer;

// <iframe title="map" width="308" height="194"
// src="https://www.google.com/maps/d/u/0/embed?mid=1SpX9qy40Pi7Yd1TGesKYrzghnQcg2lp5"
// frameBorder="0" marginHeight="0" marginWidth="0">
// </iframe>
