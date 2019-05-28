import React, {useState} from "react";

const UserInfo = ({forumData}) => {
    const [timestamp] = useState(forumData.timestamp);
    const date = timestamp.toDate().toLocaleDateString();
    const time = timestamp.toDate().toLocaleTimeString();

    return (
        <div className="post_container-userInfo">
            <img src={forumData.profilePic} alt="ProfilePic" />
            <h3>{forumData.username}</h3>
            <span>{forumData.userEmail}</span>
            <div className="time">
                <span>posted: </span>
                <span>{date}</span>
                <span>{time}</span>
            </div>
        </div>
    );
};

export default UserInfo;
