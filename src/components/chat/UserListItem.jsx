import React from 'react';

const UserListItem = ({data, user, sendMessage}) => {
    return (
        <li onClick={e => sendMessage(data)}>{data.userName}</li>
    )
}
export default UserListItem;