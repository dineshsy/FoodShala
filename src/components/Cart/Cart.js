import React, { Component } from "react";

import {
    getCart,
    getUser,
    checkoutError,
    checkoutPending,
    checkoutSuccess,
} from "../../store/reducer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addItemToCart, clearCart } from "../../store/action";
import checkoutAction from "../../bloc/checkout";

import { withRouter } from "react-router-dom";

import RestaurantMenuItem from "../RestaurantMenu/RestaurantMenuItem/RestaurantMenuItem";

import classes from "./Cart.module.css";
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";

class Cart extends Component {
    state = {
        price: null,
        modal: {
            show: false,
            data: "",
        },
    };

    componentDidMount() {
        const products = {};
        let totalPrice = 0;
        for (const product in this.props.products) {
            products[product] = {
                id: product,
                name: this.props.products[product].name,
                description: this.props.products[product].description,
                quantity: this.props.products[product].quantity,
                price: this.props.products[product].price,
                restaurantId: this.props.products[product].restaurantId,
            };
            totalPrice +=
                this.props.products[product].price *
                this.props.products[product].quantity;
        }

        this.setState({
            products,
            price: totalPrice,
        });
    }

    addItemHandler = (product) => {
        const updatedProduct = { ...this.state.products };
        ++updatedProduct[product].quantity;

        this.setState({
            products: updatedProduct,
            price: this.state.price + updatedProduct[product].price,
        });

        this.props.addItemToCart(this.state.products[product]);
    };
    removeItemHandler = (product) => {
        const updatedProduct = { ...this.state.products };
        --updatedProduct[product].quantity;
        let price = updatedProduct[product].price;
        if (updatedProduct[product].quantity <= 0) {
            delete updatedProduct[product];
        }

        this.setState({
            products: updatedProduct,
            price: this.state.price - price,
        });

        this.props.addItemToCart(this.state.products[product]);
    };

    goToMenu = () => {
        this.props.history.replace("/");
    };

    checkOutHandler = () => {
        if (!this.props.user) {
            this.props.showModal();
        } else {
            let uniqueRestaurant;
            let restaurants = [];
            for (const item in this.state.products) {
                restaurants.push(this.state.products[item].restaurantId);
            }
            uniqueRestaurant = restaurants[0];
            for (let item of restaurants) {
                if (uniqueRestaurant !== item) {
                    const updatedModal = { ...this.state.modal };
                    updatedModal.show = true;
                    updatedModal.data =
                        "Please choose items from unique restaurant :)";
                    this.setState({ modal: updatedModal });
                    return;
                }
            }

            const data = {};
            data["restaurantId"] = uniqueRestaurant;
            data["userId"] = this.props.user._id;
            data["price"] = this.state.price;
            data["products"] = this.state.products;
            data["status"] = "pending";


            this.props.checkOutHandler(data, this.props.user);
        }
    };

    popModal = () => {
        const updatedModal = { show: false, data: "" };
        this.setState({ modal: updatedModal });
    };

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.checkout !== this.props.checkout) {
            if (this.props.checkout === true) {
                const modal = {
                    show: true,
                    data: `You have successfully placed your order..
                    
                    Please view the My Orders page check your orders`,
                };
                this.setState({ modal, products: {} });

                this.props.clearCart();
            }
        }

        if (prevProps.checkoutError !== this.props.checkoutError) {
            if (this.props.checkoutError === true) {
                const modal = {
                    show: true,
                    data: `Something went wrong
                     
                     Please try refreshing`,
                };
                this.setState({ modal });
            }
        }

        if (prevProps.checkoutPending !== this.props.checkoutPending) {
            if (this.props.checkoutError === true) {
                const modal = {
                    show: true,
                    data: `Please wait while we place your order`,
                };
                this.setState({ modal });
            }
        }
    }

    render() {
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

        let productItems = [];

        products.forEach((product) => {
            if (product.quantity !== 0)
                productItems.push(
                    <RestaurantMenuItem
                        key={product.id}
                        removeItemHandler={() =>
                            this.removeItemHandler(product.id)
                        }
                        addItemHandler={() => this.addItemHandler(product.id)}
                        product={product}
                    />
                );
        });

        if (productItems.length === 0) {
            productItems = (
                <h2>
                    Please Add Items to Cart{" "}
                    <span onClick={this.goToMenu}>Go To Menu !</span>
                </h2>
            );
        }

        let mainContent = (
            <div className={classes.RestaurantMenu}>
                <h2>Cart</h2>
                {productItems}
                {productItems.length ? (
                    <React.Fragment>
                        <h1
                            style={{
                                margin: "auto",
                                color: "green",
                                textAlign: "right",
                            }}
                        >
                            Total Price : {this.state.price}
                        </h1>
                        <Button
                            fill
                            clicked={this.checkOutHandler}
                            name="Checkout"
                        />
                    </React.Fragment>
                ) : null}
            </div>
        );

        return (
            <React.Fragment>
                <Modal show={this.state.modal.show} popModal={this.popModal}>
                    {this.state.modal.data}
                </Modal>
                {mainContent}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    products: getCart(state),
    user: getUser(state),
    checkout: checkoutSuccess(state),
    checkoutPending: checkoutPending(state),
    checkoutError: checkoutError(state),
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addItemToCart: addItemToCart,
            checkOutHandler: checkoutAction,
            clearCart: clearCart,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart));
