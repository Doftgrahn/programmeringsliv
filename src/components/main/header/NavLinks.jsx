import React, {useState} from "react";

import {Link} from "react-router-dom";

const NavLinks = () => {
    const [links] = useState([
        {name: "Home", to: "/home"},
        {name: "Forum", to: "/forum"},
        {name: "Chat", to: "/chat"},
        {name: "Profile", to: "/profile"}
    ]);

    const navBar = links.map((link, index) => (
        <li key={index}>
            <Link to={link.to}>{link.name}</Link>
        </li>
    ));

    return (
        <nav>
            <ul>{navBar}</ul>
        </nav>
    );
};

export default NavLinks;
