import React from "react";
import classes from "./Button.module.css";
export default function Button(props) {

    return (
        <button
            disabled = {props.disabled}
            {...props.config}
            onClick={(event) => props.clicked(event)}
            className={
                props.small
                    ? props.fill
                        ? classes.SmallFill
                        : classes.Small
                    : props.fill
                    ? classes.ButtonFill
                    : classes.Button
            }
        >
            {props.name}
        </button>
    );
}
