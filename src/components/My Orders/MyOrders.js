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
import orderStatusHandlerAction from '../../bloc/orderStatusHandler'

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

    statusHandler =(id) => {

        const data = {}

        
        for(let order of this.state.orders) {
            if(order.id === id){
                data["status"] = order.status === "pending" ? "delivered" : "delivered";
                break
            }
        }

        const updatedOrder = [...this.state.orders];

        for(let order of updatedOrder) {
            if(order.id === id){
                order.status =
                    order.status === "pending" ? "delivered" : "delivered";
            }
        }
        
        this.setState({orders:updatedOrder})


        
        this.props.orderStatusHandler(data,id);
    }

    render() {

        if(this.props.ordersPending){
            return <h1>Please wait while we fetch your orders</h1>
        }

        if(this.state.orders.length === 0){
            return this.props.user && this.props.user.accountType === "Customer" ?<h1>You have not ordered yet.. Please Start Ordering</h1>: <h1>No Orders have been placed by customers</h1>
        }

        const orders = [];



        this.state.orders.forEach(
           order =>  orders.push(
                <OrderCard statusHandler={() => this.statusHandler(order.id)} restaurant={this.props.user.accountType} {...order}/>
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
            fetchOrders:fetchOrdersAction,
            orderStatusHandler: orderStatusHandlerAction
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MyOrders));