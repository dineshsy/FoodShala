import React from "react";

import classes from "./HeadingPrimary.module.css";

import HeadingPrimaryMain from "./HeadingPrimaryMain/HeadinPrimaryMain";
import ScrollText from "./ScrollText/ScrollText";

const headingPrimary = () => {
    return (
        <div className={classes.HeadingPrimary}>
            <HeadingPrimaryMain />
            <ScrollText />
            <p>Order food from favourite restaurants near you.</p>
        </div>
    );
};

export default headingPrimary;
