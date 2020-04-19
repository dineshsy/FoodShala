import React from "react";
import classes from "./ScrollText.module.css";

const scrollText = () => {
    return (
        <div className={classes.TextScroll}>
            <ul className={classes.flip4}>
                <li>
                    Hungry?
                </li>
                <li>
                    Unexpected Guests?
                </li>
                <li>
                    Cooking gone wrong?
                </li>
                <li>
                    Game Night?
                </li>
            </ul>
        </div>
    );
};

export default scrollText;
