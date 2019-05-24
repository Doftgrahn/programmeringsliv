import React from "react";

const UserInfo = ({forumData}) => {
    return (
        <div className="post_container-userInfo">
            <img src={forumData.profilePic} alt="ProfilePic" />
            <h3>{forumData.username}</h3>
            <span>{forumData.email}</span>
        </div>
    );
};

export default UserInfo;
