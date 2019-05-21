import React, {useState} from "react";

import NavLinks from "./NavLinks";
import Hamburger from "./Hamburger";

const Header = ({user, logIn, logOut}) => {
    const [showMeny, setShowMeny] = useState(false);

    const toggleMeny = () => {
        setShowMeny(!showMeny);
    };

    const toggleOff = () => {
        setShowMeny(false);
    };

    return (
        <header>
            <h1>ProgrammingLajf</h1>
            <NavLinks
                toggleOff={toggleOff}
                showMeny={showMeny}
                user={user}
                logIn={logIn}
                logOut={logOut}
            />
            <Hamburger toggleMeny={toggleMeny} showMeny={showMeny} />
        </header>
    );
};

export default Header;

/*
<p>hej</p>
<p>{user ? `Hi, ${user.displayName}!` : "hi!"}</p>
<button onClick={this.logIn}>Log in with facebook</button>
<button onClick={this.logOut}>Log out</button>
*/
