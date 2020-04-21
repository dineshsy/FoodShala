import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

export default function NavigationItem(props) {
    return props.reload ? (
        <a
            href={props.link}
            className={props.logo ? classes.Logo : classes.NavigationItem}
            activeClassName={classes.Active}
        >
            {props.img ? <div className={classes.img}>{props.img}</div> : null}
            <span>{props.name}</span>
        </a>
    ) : (
        <NavLink
            exact={props.exact}
            to={props.link}
            className={props.logo ? classes.Logo : classes.NavigationItem}
            activeClassName={classes.Active}
        >
            {props.img ? <div className={classes.img}>{props.img}</div> : null}
            <span style={props.noHide ? {display: "block"}: {}}>{props.name}</span>
        </NavLink>
    );
}
