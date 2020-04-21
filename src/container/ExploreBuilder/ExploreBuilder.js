import React, { Component } from "react";

import { Route } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import SignInForm from "../../components/SignInForm/SignInForm";
import SignUpForm from ".././../components/SignUpForm/SignUpForm";
import Modal from "../../components/UI/Modal/Modal";
import Restaurants from "../../components/Restaurants/Restaurants";
import RestaurantMenu from "../../components/RestaurantMenu/RestaurantMenu";
import Cart from "../../components/Cart/Cart";
import MyOrders from "../../components/My Orders/MyOrders";

export default class ExploreBuilder extends Component {
    state = {
        form: "s-in",
        show: false,
        selectedRestaurant: null,
    };

    showModal = (form) => {
        this.setState({ show: true, form });
    };

    popModal = () => {
        this.setState({ show: false });
    };

    menuHandler = (restaurant) => {
        this.setState({ selectedRestaurant: restaurant });
    };

    render() {
        return (
            <React.Fragment>
                <Modal show={this.state.show} popModal={this.popModal}>
                    {this.state.form === "s-in" ? (
                        <SignInForm
                            change={() => this.showModal("s-up")}
                            cancel={this.popModal}
                        />
                    ) : (
                        <SignUpForm
                            change={() => this.showModal("s-in")}
                            cancel={this.popModal}
                        />
                    )}
                </Modal>
                <Navbar showModal={this.showModal} />
                <div
                    style={{
                        padding: "10rem 1rem 1rem 1rem",
                    }}
                >
                    <Route
                        path="/"
                        exact
                        render={() => (
                            <Restaurants menuHandler={this.menuHandler} />
                        )}
                    />
                    <Route
                        path="/menu"
                        render={() => (
                            <RestaurantMenu
                                {...this.props.history}
                                restaurant={this.state.selectedRestaurant}
                            />
                        )}
                    />
                    <Route
                        path="/cart"
                        render={() => (
                            <Cart showModal={() => this.showModal("s-in")} />
                        )}
                    />
                    <Route
                        path="/myorders"
                        render={() => (
                            <MyOrders showModal={() => this.showModal("s-in")} />
                        )}
                    />
                </div>
            </React.Fragment>
        );
    }
}
