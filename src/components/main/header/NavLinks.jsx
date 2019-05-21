import React, {useState} from "react";

import {Link} from "react-router-dom";

const NavLinks = ({toggleOff, showMeny, user, logIn, logOut}) => {
    const [links] = useState([
        {name: "Home", to: "/home"},
        {name: "Addpost", to: "/addPost"},
        {name: "Forum", to: "/forum"},
        {name: "Chat", to: "/chat"},
        {name: "Profile", to: "/profile"}
    ]);

    const navBar = links.map((link, index) => (
        <li key={index}>
            <Link className="routerLinks" to={link.to} onClick={toggleOff}>
                {link.name}
            </Link>

        </li>
    ));

    return (
        <nav className={"navBar " + (showMeny ? "h_active" : "")}>
            <ul>
            {navBar}
            {!user ? <li onClick={logIn}>Log in</li> : <li onClick={logOut}>Log out</li>}
            </ul>
        </nav>
    );
};

export default NavLinks;
