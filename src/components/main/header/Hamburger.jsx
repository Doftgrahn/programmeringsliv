import React from "react";

const Hamburger = ({toggleMeny, showMeny}) => {
    return (
        <div
            className={"hamburger " + (showMeny ? "active" : "")}
            onClick={toggleMeny}
        >
            <span />
            <span />
            <span />
        </div>
    );
};

export default Hamburger;
