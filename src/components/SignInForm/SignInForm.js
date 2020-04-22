import React, { Component } from "react";

import classes from "./SignInForm.module.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import userSigninAction from "../../bloc/auth/SignIn";
import fetchClientsAction from '../../bloc/fetchClients'
import { getUser, getUserError, getUserPending } from "../../store/reducer";

import { withRouter } from "react-router-dom";

import Input from "../Input/Input";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";

class SignInForm extends Component {
    state = {
        primaryDetails: {
            username: {
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
            password: {
                id: "2",
                elementType: "input",
                label: "Password",
                elementConfig: {
                    type: "password",
                    placeholder: "Value",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            accountType: {
                id: "3",
                elementType: "select",
                label: "Account Type",
                elementConfig: {
                    type: "text",
                    placeholder: "Value",
                    option: [
                        { value: "", displayValue: "Value" },
                        {
                            value: "Customer",
                            displayValue: "Customer",
                        },
                        {
                            value: "Restaurant",
                            displayValue: "Restaurant",
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

    signInHandler = (event) => {
        const data = {
            username: this.state.primaryDetails.username.value,
            password: this.state.primaryDetails.password.value,
        };
        const { userSignin } = this.props;

        userSignin(data, this.state.primaryDetails.accountType.value);
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.user !== this.props.user) {
            this.props.cancel();
            this.props.fetchClients();
            this.props.history.replace("/");
        }
        if (
            this.props.error !== prevProps.error &&
            this.props.error !== null &&
            this.state.formIsValid
        ) {
            this.setState({ errorText: "Username or password is incorrect" });
            const updatedPrimaryDetails = {
                ...this.state.primaryDetails,
            };
            this.props.fetchClients()
            updatedPrimaryDetails.password.value = "";
            updatedPrimaryDetails.username.value = "";
            this.setState({
                primaryDetails: updatedPrimaryDetails,
                formIsValid: false,
            });
        }
    }

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
            <form className={classes.SignInForm} onSubmit={this.signInHandler}>
                <h5>{this.state.errorText}</h5>
                {form}
                <Button
                    fill
                    disabled={!this.state.formIsValid}
                    config={{ type: "button" }}
                    clicked={(event) => this.signInHandler(event)}
                    name={this.props.pending ? <Spinner /> : "Sign In"}
                />
                <h3>
                    New foodie!!??{" "}
                    <div onClick={this.props.change}>Register here!</div>
                </h3>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    user: getUser(state),
    error: getUserError(state),
    pending: getUserPending(state),
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            userSignin: userSigninAction,
            fetchClients: fetchClientsAction
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(SignInForm));
