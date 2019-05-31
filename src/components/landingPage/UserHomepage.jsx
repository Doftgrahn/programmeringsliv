import React from 'react';

const UserHomepage = () => {
    return (
      <div className="memes">
        <div className="welcomingText">
          Now that you are one of us, please enjoy some memes!
        </div>
        <img
          src="https://i.redd.it/dsdbmyoirso01.jpg"
          alt="funny3"
          className="moreAboutUs"
        />
        <img
          src="http://www.quickmeme.com/img/63/633577dfc0c4e62450b4f8ad8c10ac86f7e29d470e1f60e3707f8fa95af6cdde.jpg"
          alt="baby"
          className="moreAboutUs"
        />
        <img
          src="https://img.devrant.com/devrant/rant/r_674227_nSiDU.jpg"
          alt="funny0"
          className="moreAboutUs"
        />
        <img
          src="https://i.imgflip.com/14479h.jpg"
          alt="funny1"
          className="moreAboutUs"
        />
      </div>
    );
}

export default UserHomepage;