import React, {useState} from "react";

import NavLinks from "./NavLinks";
import Hamburger from "./Hamburger";

const Header = () => {
    const [showMeny, setShowMeny] = useState(false);

    const toggleMeny = () => {
        setShowMeny(!showMeny);
    };

    const toggleOff = () => {
        setShowMeny(false);
    };

    return (
        <header>
            <NavLinks toggleOff={toggleOff} showMeny={showMeny} />
            <Hamburger toggleMeny={toggleMeny} showMeny={showMeny} />
        </header>
    );
};

export default Header;
