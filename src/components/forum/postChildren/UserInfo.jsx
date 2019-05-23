import React from 'react';

const UserInfo = ({user}) => {
    return (<div className="post_container-userInfo">
        <img src={user.photoURL} alt="ProfilePic"/>
        <h3>{user.displayName}</h3>
        <span>{user.email}</span>
    </div>)
}

export default UserInfo;
