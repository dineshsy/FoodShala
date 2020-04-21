import React from "react";

import classes from "./OrderCard.module.css";
import Button from "../Button/Button";

export default function OrderCard(props) {
    const products = [];

    for (let product in props.products) {
        products.push({
            id: product,
            name: props.products[product].name,
            quantity: props.products[product].quantity,
            price: props.products[product].price,
        });
    }

    return (
        <div
            style={
                props.status === "pending"
                    ? { backgroundColor: "rgb(223, 85, 85)" }
                    : {}
            }
            className={classes.Card}
        >
            <h2>{props.name}</h2>
            <div className={classes.Products}>
                {products.map((product) => (
                    <div className={classes.Product}>
                        <span>
                            {product.name} X {product.quantity}
                        </span>
                        <span>{product.price}</span>
                    </div>
                ))}
            </div>
            <div className={classes.Footer}>
                <span>Total Price: {props.price}</span>
                {props.restaurant === "Restaurant" ? (
                    <span >
                        Status :{" "}
                        <Button
                        small
                            clicked={props.statusHandler}
                            name={props.status}
                        />
                    </span>
                ) : (
                    <span>Status: {props.status}</span>
                )}
            </div>
        </div>
    );
}
