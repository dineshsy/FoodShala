import React from "react";

import classes from "./RestaurantCard.module.css";

import PrimaryTag from "../Tags/PrimaryTag/PrimaryTag";
import dummy from "../../../assets/Background/dummyRestaurant.jpg";

export default function RestaurantCard(props) {
    return (
        <div className={classes.Card} onClick={props.clicked}>
            <div className={classes.Header}>
                {props.imgSrc ? (
                    <img src={props.imgSrc} alt={props.name} />
                ) : (
                    <img src={dummy} alt={props.name} />
                )}
            </div>
            <span className={classes.Title}>{props.name}</span>
            <div className={classes.Cusines}>
                <h5>Cusines</h5>
                {props.cusines.map((cusine, index) => {
                    if (index < 2) {
                        return <PrimaryTag key={cusine} name={cusine} />;
                    }
                })}
            </div>
        </div>
    );
}
