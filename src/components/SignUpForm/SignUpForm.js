import React, { Component } from "react";

import Input from "../Input/Input";

export default class SignUpForm extends Component {
    state = {
        primaryDetails: {
            firstName: {
                id: "1",
                elementType: "input",
                label: "User Name",
                elementConfig: {
                    type: "text",
                    placeholder: "Value",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            lastName: {
                id: "2",
                elementType: "input",
                label: "Password",
                elementConfig: {
                    type: "text",
                    placeholder: "Value",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            username: {
                id: "3",
                elementType: "input",
                label: "User Name",
                elementConfig: {
                    type: "text",
                    placeholder: "Value",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                id: "4",
                elementType: "input",
                label: "Password",
                elementConfig: {
                    type: "text",
                    placeholder: "Value",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            serving: {
                id: "5",
                elementType: "select",
                label: "Serving",
                elementConfig: {
                    type: "text",
                    placeholder: "Value",
                    option: [
                        { value: "", displayValue: "Value" },
                        {
                            value: "veg",
                            displayValue: "Veg",
                        },
                        {
                            value: "nonVeg",
                            displayValue: "Non Veg",
                        },
                    ],
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
        },
        restaurantDetails: {
            firstName: {
                id: "1",
                elementType: "input",
                label: "User Name",
                elementConfig: {
                    type: "text",
                    placeholder: "Value",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            lastName: {
                id: "2",
                elementType: "input",
                label: "Password",
                elementConfig: {
                    type: "text",
                    placeholder: "Value",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            username: {
                id: "3",
                elementType: "input",
                label: "User Name",
                elementConfig: {
                    type: "text",
                    placeholder: "Value",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                id: "4",
                elementType: "input",
                label: "Password",
                elementConfig: {
                    type: "text",
                    placeholder: "Value",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            cusines: {
                id: "5",
                elementType: "input",
                label: "Cusines",
                elementConfig: {
                    type: "text",
                    placeholder: "Value",
                },
                tagHandler: true,
                selected: [],
                value: "",
                actions: true,
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
        },
    };
    render() {
        return <div></div>;
    }
}
