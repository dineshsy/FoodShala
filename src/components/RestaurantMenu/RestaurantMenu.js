import React, { Component } from "react";

import classes from "./RestaurantMenu.module.css";

import {
    getProducts,
    getCart,
    getProductsError,
    getProductsPending,
} from "../../store/reducer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addItemToCart } from "../../store/action";
import fetchProductsAction from "../../bloc/fetchProducts";

import dummy from "../../assets/Background/dummyRestaurant1.jpg";
import { withRouter } from "react-router-dom";
import RestaurantMenuItem from "./RestaurantMenuItem/RestaurantMenuItem";


class RestaurantMenu extends Component {
    state = {};

    UNSAFE_componentWillMount() {

        if (this.props.restaurant === null) {
            this.props.history.replace("/");
            return;
        }

        this.props.fetchProducts(this.props.restaurant.id);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.products !== this.props.products) {
            const products = {};
            this.props.products.forEach(
                (product) =>
                    (products[product.id] = {
                        id: product.id,
                        name: product.name,
                        description: product.itemDescription,
                        price: product.price,
                        quantity: this.props.cart[product.id]
                            ? this.props.cart[product.id].quantity
                            : 0,
                        restaurantId: product.restaurantId,
                        mealType: product.mealType
                    })
            );

            this.setState({
                products,
            });
        }
    }

    addItemHandler = (product) => {
        const updatedProduct = { ...this.state.products };
        ++updatedProduct[product].quantity;
        this.setState({
            products: updatedProduct,
        });
        this.props.addItemToCart(this.state.products[product]);
    };
    removeItemHandler = (product) => {
        const updatedProduct = { ...this.state.products };
        --updatedProduct[product].quantity;
        this.setState({
            products: updatedProduct,
        });

        this.props.addItemToCart(this.state.products[product]);
    };

    render() {
        if (this.props.pending) {
            return (
                <h1 style={{ margin: "auto" }}>
                    Please wait while we fetch the menu
                </h1>
            );
        }

        if (this.props.error) {
            return (
                <div style={{ margin: "auto", color: "red" }}>
                    Something went worng.. Please Refresh..!
                </div>
            );
        }

        const restaurant = this.props.restaurant;

        if (restaurant === null) {
            this.props.history.replace("/");
            return null;
        }

        let products = [];

        for (const product in this.state.products) {
            products.push({
                id: product,
                ...this.state.products[product],
            });
        }

        const productItems = [];

        products.forEach((product) => {
            productItems.push(
                <RestaurantMenuItem
                    key={product.id}
                    noEdit = {this.props.noEdit}
                    removeItemHandler={() => this.removeItemHandler(product.id)}
                    addItemHandler={() => this.addItemHandler(product.id)}
                    product={product}
                />
            );
        });

        if(productItems.length === 0) {
            return <h1> The restaurant not yet added their items</h1>
        }

        return (
            <div className={classes.RestaurantMenu}>
                <h2>Menu for {" "}{restaurant.name}</h2>
                <div className={classes.Header}>
                    {restaurant.img ? (
                        <img src={restaurant.img} alt="" />
                    ) : (
                        <img src={dummy} />
                    )}
                </div>
                {productItems}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    products: getProducts(state),
    cart: getCart(state),
    error: getProductsError(state),
    pending: getProductsPending(state),
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addItemToCart: addItemToCart,
            fetchProducts: fetchProductsAction,
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(RestaurantMenu));
