import React from 'react';

const UserListItem = ({name, user}) => {
    return (
        <li>{user.userName}</li>
    )
}
export default UserListItem;