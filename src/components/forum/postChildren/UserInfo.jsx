import React from 'react';

const UserInfo = ({user}) => {
    console.log(user);
    return (<div className="post_container-userInfo">
        <img src={user.profilePic} alt="ProfilePic"/>
        <h3>{user.username}</h3>
        <span>{user.email}</span>
    </div>)
}

export default UserInfo;
