import React from "react";

import classes from "./RestaurantMenuItem.module.css";

import Button from "../../UI/Button/Button";

export default function RestaurantMenuItem(props) {

    return (
        <div className={classes.Item}>
            <div className={classes.Leading}>
                {props.product.image ? (
                    <img src={props.product.image} alt={props.product.name} />
                ) : null}
                <h3>{props.product.name}</h3>
                <h5>{props.product.description}</h5>
            </div>
            <h3
                style={
                    props.product.mealType === "veg"
                        ? { color: "green" }
                        : { color: "red" }
                }
            >
                {props.product.mealType}
            </h3>
            <h3>Price: {props.product.price}</h3>

            {!props.noEdit ? (
                <div className={classes["Actions"]}>
                    {props.product.quantity ? (
                        <Button
                            clicked={props.removeItemHandler}
                            name="Remove"
                        />
                    ) : null}
                    <Button
                        clicked={props.addItemHandler}
                        name={
                            !props.product.quantity
                                ? "ADD"
                                : `ADD ${props.product.quantity}`
                        }
                    />
                </div>
            ) : null}
        </div>
    );
}
