import React from "react";
import classes from "./PrimaryTag.module.css";
import Close from "../../../../assets/Tools/close icon.svg";

export default function PrimaryTag(props) {
    return (
        <div className={classes.SelectedItem}>
            <span>{props.name}</span>
            {props.clicked ? (
                <img onClick={props.clicked} src={Close} alt="Close" />
            ) : null}
        </div>
    );
}
