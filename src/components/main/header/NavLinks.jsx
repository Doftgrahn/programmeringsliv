import React, {useState} from "react";

import {Link} from "react-router-dom";

const NavLinks = ({toggleOff, showMeny, user, logIn, logOut, unreadMessages, switchNewMessage}) => {
    const [links] = useState([
        {name: "Home", to: "/home"},
        {name: "New Post", to: "/addPost"},
        {name: "Forum", to: "/forum"},
        {name: "Chat", to: "/chat"},
        {name: "Profile", to: "/profile"}
    ]);
    const fakeFunction = () => {}
    const navBar = links.map((link, index) => (
        <li key={index} onClick={link.name === 'Chat'? e => switchNewMessage(e): e => fakeFunction() }>
            <Link className="routerLinks" to={link.to} onClick={toggleOff}>
                {link.name} {link.name === 'Chat' && unreadMessages? <i className=" alertNewMessage far fa-envelope"></i> : ''}
            </Link>
        </li>
    ));

    return (
        <nav className={"navBar " + (showMeny ? "h_active" : "")}>
            <ul>
                {navBar}
                {!user ? (
                    <li onClick={logIn}>Log in</li>
                ) : (
                    <li onClick={logOut}>Log out</li>
                )}
            </ul>
        </nav>
    );
};

export default NavLinks;

