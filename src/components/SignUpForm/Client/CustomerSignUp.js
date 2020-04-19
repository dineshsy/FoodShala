import React, { Component } from "react";

import classes from "./CustomerSignUp.module.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import clientSignUpAction from "../../../bloc/auth/clientSignUp";
import {
    getClientError,
    getClientPending,
    getClientSuccess,
} from "../../../store/reducer";

import Input from "../../Input/Input";
import Button from "../../UI/Button/Button";
import Spinner from "../../UI/Spinner/Spinner";

class ClientSignUp extends Component {
    state = {
        primaryDetails: {
            firstName: {
                id: "1",
                elementType: "input",
                label: "First Name",
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
                label: "Last Name",
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
                    type: "password",
                    placeholder: "Value",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 8,
                },
                valid: false,
                touched: false,
            },
            preference: {
                id: "5",
                elementType: "select",
                label: "Preference",
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
        errorText: "",
        formIsValid: false,
        auth: false,
    };

    checkValid(value, rules) {
        let isValid = false;
        if (rules && rules.required) {
            isValid = value.trim() !== "";
        }
        if (rules && rules.minLength) {
            isValid = isValid && value.trim().length >= rules.minLength;
            if (!isValid || rules.minLength > value.trim().lenght) {
                this.setState({
                    errorText: "Password requires atleast 8 characters",
                });
            } else {
                this.setState({
                    errorText: "",
                });
            }
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
            if (updatedPrimaryDetails[item].tagHandler) {
                formIsValid =
                    updatedPrimaryDetails[item].selected.length > 0 &&
                    formIsValid;
                continue;
            }
            formIsValid = updatedPrimaryDetails[item].valid && formIsValid;
        }

        this.setState({
            primaryDetails: updatedPrimaryDetails,
            formIsValid: formIsValid,
        });
    };

    addItemToCheck = (identifierElement) => {
        if (this.state.primaryDetails[identifierElement].valid) {
            const updatedPrimaryDetails = {
                ...this.state.primaryDetails,
            };

            const updatedPrimaryDetailsElement = {
                ...updatedPrimaryDetails[identifierElement],
            };

            updatedPrimaryDetailsElement.selected.push(
                updatedPrimaryDetailsElement.value
            );
            updatedPrimaryDetailsElement.value = "";
            updatedPrimaryDetailsElement.valid = false;
            updatedPrimaryDetailsElement.touched = false;
            updatedPrimaryDetails[
                identifierElement
            ] = updatedPrimaryDetailsElement;
            let formIsValid = true;
            for (const item in updatedPrimaryDetails) {
                if (typeof updatedPrimaryDetails[item] === "string") continue;
                if (updatedPrimaryDetails[item].tagHandler) {
                    formIsValid =
                        updatedPrimaryDetails[item].selected.length > 0 &&
                        formIsValid;
                    continue;
                }
                formIsValid = updatedPrimaryDetails[item].valid && formIsValid;
            }

            this.setState({
                primaryDetails: updatedPrimaryDetails,
                formIsValid: formIsValid,
            });
        }
    };

    removeItemFromCheck = (index, identifierElement) => {
        const updatedPrimaryDetails = {
            ...this.state.primaryDetails,
        };

        const updatedPrimaryDetailsElement = {
            ...updatedPrimaryDetails[identifierElement],
        };

        updatedPrimaryDetailsElement.selected = this.state.primaryDetails[
            identifierElement
        ].selected.filter((ele, i) => i !== index);

        updatedPrimaryDetails[identifierElement] = updatedPrimaryDetailsElement;

        let formIsValid = true;

        for (const item in updatedPrimaryDetails) {
            if (updatedPrimaryDetails[item].tagHandler) {
                formIsValid =
                    updatedPrimaryDetails[item].selected.length > 0 &&
                    formIsValid;
                continue;
            }
            formIsValid = updatedPrimaryDetails[item].valid && formIsValid;
        }

        this.setState({
            primaryDetails: updatedPrimaryDetails,
            formIsValid: formIsValid,
        });
    };

    clientSignUpHandler = (event) => {
        event.preventDefault();
        const data = {};

        for (let field in this.state.primaryDetails) {
            data[field] = this.state.primaryDetails[field].value;
        }

        data["accountType"] = "Customer";

        this.props.clientSignUp(data);
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.props.auth !== prevProps.auth) {
            this.setState({ auth: true });
            setTimeout(() => {
                this.props.cancel();
                setTimeout(() => {
                    this.props.change()
                }, 500);
            }, 1500)
        } else if (this.props.error !== prevProps.error) {
            this.setState({
                errorText: "UserName is already taken.",
            });
            const updatedPrimaryDetails = {
                ...this.state.primaryDetails,
            };
            for (let field in updatedPrimaryDetails) {
                updatedPrimaryDetails[field].value = "";
            }

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
                    addTag={() => this.addItemToCheck(formElement.id)}
                    removeTag={(index) => {
                        this.removeItemFromCheck(index, formElement.id);
                    }}
                    isTag={formElement.config.tagHandler}
                    selected={formElement.config.selected}
                    analyzeText={formElement.config.analyzeText}
                    shouldValidate={formElement.config.validation}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    imgSrc={formElement.config.imgSrc}
                    actions={formElement.config.actions}
                    isPassword={formElement.config.isPassword}
                />
            );
        });

        if (this.state.auth) {
            form = (
                <h1
                    style={{
                        color: "green",
                        width: "100%",
                        height: "20rem",
                        textAlign: "center",
                    }}
                >
                    {" "}
                    Successfully Registered
                </h1>
            );
        }

        return (
            <form className={classes.Client}>
                <h5>{this.state.errorText}</h5>
                {form}{" "}
                <Button
                    fill
                    disabled={!this.state.formIsValid}
                    config={{ type: "button" }}
                    clicked={(event) => this.clientSignUpHandler(event)}
                    name={this.props.pending ? <Spinner /> : "Sign Up"}
                />
                <h3>
                    Already registered!!??{" "}
                    <div onClick={this.props.change}>Sign In here!</div>
                </h3>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    error: getClientError(state),
    pending: getClientPending(state),
    auth: getClientSuccess(state),
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            clientSignUp: clientSignUpAction,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ClientSignUp);
