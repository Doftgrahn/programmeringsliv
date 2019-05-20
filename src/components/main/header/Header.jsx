import React, {useState} from "react";

import NavLinks from "./NavLinks";

const Header = () => {
    //const [toggle, setToggle] = useState(false);

    return (
        <header>
            <NavLinks />
        </header>
    );
};

export default Header;
