import React from "react";
import classes from './ButtonFlip.module.css'

export default function ButtonFilp(props) {
    const flipClasses = [classes["flip"]];

    if (props.flip === true) {
        flipClasses.push(classes["flipped"]);
    }

    let back = [classes.back]

    if(props.to){
        back.push(classes.backBig)
    }
    return (
        <div className={classes["cont-flip"] + " " + flipClasses.join(" ")}>
            <div className={classes["front"]}>
                <div className={flipClasses.join(" ")}>{props.button}</div>
            </div>
            <div className={back.join(' ')}>
                <div
                    onClick={props.cancel}
                    className={flipClasses.join(" ") + " " + classes["close"]}
                >
                </div>
                    {props.back}
            </div>
        </div>
    );
}
