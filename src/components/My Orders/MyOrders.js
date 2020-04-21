import React, { Component } from 'react'

import {
    getClients,
    getUser,
    getOrdersError,
    getOrdersPending,
    getOrdersSuccess,
} from "../../store/reducer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import fetchOrdersAction from "../../bloc/fetchOrders";

import classes from './MyOrders.module.css'

import { withRouter } from "react-router-dom";
import OrderCard from '../UI/OrderCard/OrderCard';
class MyOrders extends Component {

    state = {
        orders: []
    }

    componentDidMount() {
        if(this.props.user)
        this.props.fetchOrders(this.props.user)
        else {
            this.props.history.replace('/')
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.orders !== this.props.orders){
            console.log(this.props.restaurants);
            
            if(this.props.orders.length){
                let orders = []
                let restaurantName = "";
                for(let order of this.props.orders) {
                    for (const restaurant of this.props.restaurants) {
                    if(order.restaurantId === restaurant.id){
                        restaurantName = restaurant.restaurantName;
                        break;
                    }
                }
                }
                
                
                for (const order of this.props.orders) {
                    orders.push( {
                        id:order.id,
                        name: restaurantName,
                        products: {...order.products},
                        price: order.price,
                        status: order.status
                    })
                }
                this.setState({orders})
            }
        }
    }

    render() {

        if(this.props.ordersPending){
            return <h1>Please wait while we fetch your orders</h1>
        }

        if(this.state.orders.length === 0){
            return <h1>You have not ordered yet.. Please Start Ordering</h1>
        }

        const orders = [];

        this.state.orders.forEach(
           order =>  orders.push(
                <OrderCard {...order}/>
            )
        )

        return (
            <div className={classes.Card}>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: getUser(state),
    restaurants: getClients(state),
    orders: getOrdersSuccess(state),
    ordersPending: getOrdersPending(state),
    ordersError: getOrdersError(state),
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            fetchOrders:fetchOrdersAction
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyOrders));