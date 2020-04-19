import React, { Component } from "react";
import classes from "./IntroPage.module.css";
import HeadingPrimary from "./HeadingPrimary/HeadingPrimary";
import Button from "../UI/Button/Button";
import ButtonFilp from "../UI/ButtonFilp/ButtonFilp";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";

export default class IntroPage extends Component {
    state = {
        flip: {
            doFlip: false,
            toFlip: null,
        },
        disable: false,
    };

    flipHandler = (flip) => {
        let updateFlip = { ...this.state.flip };
        if (flip === "s-in") {
            updateFlip.doFlip = true;

        } else if (flip === "s-up") {
            updateFlip.doFlip = true;
        }
        this.setState({
            flip: updateFlip,
        });
        if (flip === "s-in") {
            updateFlip.toFlip = true;
        } else if (flip === "s-up") {
            updateFlip.toFlip = false;
        }

        setTimeout(() => {
            this.setState({ disable: true , flip: updateFlip});
        }, 200);
    };

    flipCancelHandler = () => {
        let updateFlip = { ...this.state.flip };
        updateFlip.doFlip = false;
        updateFlip.toFlip = null;

        this.setState({
            flip: updateFlip,
            disable: false,
        });
    };

    render() {
        return (
            <section className={classes.Image}>
                <HeadingPrimary />
                <ButtonFilp
                    to={!this.state.flip.toFlip}
                    flip={this.state.flip.doFlip}
                    cancel={this.flipCancelHandler}
                    button={
                        <Button
                            disabled={this.state.disable}
                            clicked={this.props.onChange}
                            name="Explore"
                        />
                    }
                    back={
                        this.state.flip.toFlip ||
                        this.state.flip.toFlip === null ? (
                            <SignInForm
                                change={() => this.flipHandler("s-up")}
                                cancel={this.flipCancelHandler}
                            />
                        ) : (
                            <SignUpForm
                                change={() => this.flipHandler("s-in")}
                                cancel={this.flipCancelHandler}
                            />
                        )
                    }
                />
                <div
                    className={
                        !this.state.flip.doFlip
                            ? classes.Sign
                            : classes.SignNone
                    }
                >
                    <Button
                        small
                        clicked={() => this.flipHandler("s-in")}
                        name="Sign In"
                    />
                    <Button
                        small
                        fill
                        clicked={() => this.flipHandler("s-up")}
                        name="Sign Up"
                    />
                </div>
            </section>
        );
    }
}
