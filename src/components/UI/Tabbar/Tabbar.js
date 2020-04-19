import React from "react";
import classes from "./Tabbar.module.css";

export default function Tabbar(props) {
    return (
        <div className={classes.Tabbar}>
            {props.tabs.map((tab) => {
                const classname = [classes.Item];
                if (tab.active) {
                    classname.push(classes.Active);
                }
                return (
                    <div onClick={() => props.clicked(tab.id)} className={classname.join(" ")} key={tab.id}>
                        {tab.id}
                    </div>
                );
            })}
        </div>
    );
}
