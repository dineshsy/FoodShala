import React, { Component } from "react";

import classes from "./Restaurant.module.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import fetchClientsAction from "../../bloc/fetchClients";
import { getClients } from "../../store/reducer";
import RestaurantCard from "../UI/RestaurantCard/RestaurantCard";
import { NavLink } from "react-router-dom";

class Restaurants extends Component {
    componentDidMount() {
        this.props.fetchClients();
    }

    shouldComponentUpdate(prevProps, prevState) {
        console.log();
        if (prevProps.clients == this.props.client) return false;
        return true;
    }

    render() {
        const restaurants = [];
        this.props.clients.forEach((client) =>
            restaurants.push({
                id: client.id,
                name: client.restaurantName,
                cusines: client.cusines,
            })
        );
        return (
            <div className={classes.Restaurants}>
                <h2>Restaurants</h2>
                <div className={classes.Card}>
                    {restaurants.map((restaurant) => (
                        <NavLink to="/menu" key={restaurant.id}>
                            <RestaurantCard
                                name={restaurant.name}
                                cusines={restaurant.cusines}
                                clicked={() =>
                                    this.props.menuHandler(restaurant)
                                }
                            />
                        </NavLink>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    clients: getClients(state),
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            fetchClients: fetchClientsAction,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
