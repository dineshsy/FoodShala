import React, { Component } from "react";

import classes from './SignUpForm.module.css'
import ClientSignUp from "./Client/CustomerSignUp";
import CustomerSignUp from "./Customer/ClientSignUp";
import Tabbar from "../UI/Tabbar/Tabbar";
export default class SignUpForm extends Component {
    state = {
        tabs: {
            customer: {
                id: "Customer",
                active: true,
            },
            restaurant: {
                id: "Restaurant",
                active: false,
            },
        },
        accountType: "Customer",
    };

    tabChangeHandler = (id) => {
        let updatedTabs = {
            ...this.state.tabs,
        };

        for (let tab in updatedTabs) {
            if (updatedTabs[tab].active === true) {
                updatedTabs[tab].active = false;
                break;
            }
        }

        for (let tab in updatedTabs) {
            if (updatedTabs[tab].id === id) {
                updatedTabs[tab].active = true;
                break;
            }
        }

        this.setState({
            accountType: id,
        });
    };

    render() {
        let form =
            this.state.accountType === "Customer" ? (
                <ClientSignUp
                    change={this.props.change}
                    cancel={this.props.cancel}
                />
            ) : (
                <CustomerSignUp
                    change={this.props.change}
                    cancel={this.props.cancel}
                />
            );

        const tabs = [];

        for (let tab in this.state.tabs) {
            tabs.push({
                id: this.state.tabs[tab].id,
                active: this.state.tabs[tab].active,
            });
        }
        return (
            <div className={classes.Form}>
                <Tabbar clicked={this.tabChangeHandler} tabs={tabs} />
                {form}
            </div>
        );
    }
}
