import React, {useState} from "react";

const SortAButtons = ({
    sortKey,
    sortByNewest,
    sortByOldest,
    sortByHighestVotes,
    sortByLowest
}) => {
    const [isVisible, setIsVisible] = useState(true);

    const toggle = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            <div className="fBtnA">
                <button onClick={toggle}>Sort</button>
                {isVisible ? null : (
                    <>
                        <button
                            onClick={sortByNewest}
                            disabled={sortKey === "newest" ? true : false}
                            className={sortKey === "newest" ? "activeBtn" : ""}
                        >
                            Newest
                        </button>
                        <button
                            onClick={sortByOldest}
                            disabled={sortKey === "oldest" ? true : false}
                            className={sortKey === "oldest" ? "activeBtn" : ""}
                        >
                            Oldest
                        </button>
                        <button
                            onClick={sortByHighestVotes}
                            disabled={sortKey === "highest" ? true : false}
                            className={sortKey === "highest" ? "activeBtn" : ""}
                        >
                            Highest Votes
                        </button>
                        <button
                            onClick={sortByLowest}
                            disabled={sortKey === "lowest" ? true : false}
                            className={sortKey === "lowest" ? "activeBtn" : ""}
                        >
                            Lowest Votes
                        </button>
                    </>
                )}
            </div>
        </>
    );
};

export default SortAButtons;
