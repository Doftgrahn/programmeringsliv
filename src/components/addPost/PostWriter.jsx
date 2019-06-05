import React from "react";


const Writer = ({user}) => {
  
  return (
    <div className="profileInfo postWriter">
      <img src={!user ? "https://cdn.impactinit.com/cdn/x/x@ac8c3fd87c/smss53/smsimg28/pv/ingimagecontributors/ing_47129_07704.jpg" : user.photoURL}
      alt="avatarImg"
      className="avatarImg"
      />
      <div className="name">{!user ? 'User Unknown' : user.displayName}</div>
      <div className="email">{!user ? 'email@gmail.com' : user.email}</div>
    </div>
  )
}

export default Writer;
