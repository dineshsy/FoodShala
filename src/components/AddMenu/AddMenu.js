import React, { Component } from "react";

import classes from "./AddMenu.module.css";

import {
    getAddMenuError,
    getAddMenuPending,
    getAddMenuSuccess,
    getUser,
} from "../../store/reducer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import addMenuHandlerAction from "../../bloc/addMenuHandler";
import fetchProductsAction from "../../bloc/fetchProducts";

import { withRouter } from "react-router-dom";

import Input from "../Input/Input";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";

class AddMenu extends Component {
    state = {
        primaryDetails: {
            name: {
                id: "1",
                elementType: "input",
                label: "Food Name",
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
            itemDescription: {
                id: "2",
                elementType: "input",
                label: "Food Description",
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
            mealType: {
                id: "3",
                elementType: "select",
                label: "Meal Type",
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
                            value: "nonveg",
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
            price: {
                id: "4",
                elementType: "input",
                label: "Price",
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
        },
        formIsValid: false,
        errorText: "",
    };

    checkValid(value, rules) {
        let isValid = false;
        if (rules && rules.required) {
            isValid = value.trim() !== "";
        }
        if (rules && rules.minLength) {
            isValid = isValid && value.trim().length >= rules.minLength;
        }

        return isValid;
    }

    changeHandler = (event, identifierElement) => {
        const updatedPrimaryDetails = {
            ...this.state.primaryDetails,
        };

        const updatedPrimaryDetailsElement = {
            ...updatedPrimaryDetails[identifierElement],
        };

        updatedPrimaryDetailsElement.value = event.target.value;
        updatedPrimaryDetailsElement.valid = this.checkValid(
            updatedPrimaryDetailsElement.value,
            updatedPrimaryDetailsElement.validation
        );
        updatedPrimaryDetailsElement.touched = true;
        updatedPrimaryDetails[identifierElement] = updatedPrimaryDetailsElement;

        let formIsValid = true;
        for (const item in updatedPrimaryDetails) {
            formIsValid = updatedPrimaryDetails[item].valid && formIsValid;
        }

        this.setState({
            primaryDetails: updatedPrimaryDetails,
            formIsValid: formIsValid,
        });
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.addMenu !== this.props.addMenu) {
            if (this.props.addMenu) {
                this.props.fetchProducts(this.props.user._id);
                this.props.cancel();
                this.props.history.replace("/");
            }
        }
        if (
            this.props.error !== prevProps.error &&
            this.props.error !== null &&
            this.state.formIsValid
        ) {
            this.setState({
                errorText: "Something went wrong please try again",
            });
            const updatedPrimaryDetails = {
                ...this.state.primaryDetails,
            };
            for (const field in updatedPrimaryDetails) {
                updatedPrimaryDetails[field].value = "";
            }
            this.setState({
                primaryDetails: updatedPrimaryDetails,
                formIsValid: false,
            });
        }
    }

    addMenuHandler = () => {
        const data = {};

        data["name"] = this.state.primaryDetails.name.value;
        data[
            "itemDescription"
        ] = this.state.primaryDetails.itemDescription.value;
        data["mealType"] = this.state.primaryDetails.mealType.value;
        data["price"] = +this.state.primaryDetails.price.value;
        data["restaurantId"] = this.props.user._id;

        this.props.addMenuHandler(data, this.props.user);
    };

    render() {
        let formElements = [];

        for (let item in this.state.primaryDetails) {
            formElements.push({
                id: item,
                config: this.state.primaryDetails[item],
            });
        }

        let form = formElements.map((formElement) => {
            return (
                <Input
                    key={formElement.id}
                    changed={(event) =>
                        this.changeHandler(event, formElement.id)
                    }
                    label={formElement.config.label}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    shouldValidate={formElement.config.validation}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                />
            );
        });
        return (
            <React.Fragment>
                <span className={classes.Heading}>Add Menu Item</span>
                <form className={classes.SignInForm}>
                    <h5>{this.state.errorText}</h5>
                    {form}
                    <Button
                        fill
                        disabled={!this.state.formIsValid}
                        config={{ type: "button" }}
                        clicked={(event) => this.addMenuHandler(event)}
                        name={this.props.pending ? <Spinner /> : "Add To Menu"}
                    />
                </form>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => ({
    addMenu: getAddMenuSuccess(state),
    error: getAddMenuError(state),
    pending: getAddMenuPending(state),
    user: getUser(state),
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addMenuHandler: addMenuHandlerAction,
            fetchProducts: fetchProductsAction,
        },
        dispatch
    );
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AddMenu));
