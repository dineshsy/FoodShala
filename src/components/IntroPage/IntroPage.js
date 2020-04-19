import React, { Component } from "react";
import classes from "./IntroPage.module.css";
import HeadingPrimary from "./HeadingPrimary/HeadingPrimary";
import Button from "../UI/Button/Button";
import ButtonFilp from "../UI/ButtonFilp/ButtonFilp";
import SignInForm from "../SignInForm/SignInForm";

export default class IntroPage extends Component {
    state = {
        flip: {
            doFlip: false,
            toFlip: null,
        },
        disable: false
    };


    flipHandler = (flip) => {
        let updateFlip = { ...this.state.flip };
        if (flip === "s-in") {
            updateFlip.doFlip = true;
            updateFlip.toFlip = true;
        } else if (flip === "s-up") {
            updateFlip.doFlip = true;
            updateFlip.toFlip = false;
        }

        this.setState({
            flip: updateFlip,
        });

        setTimeout(() => {
            this.setState({disable:true})
        }, 200);
    };

    flipCancelHandler = () => {
        let updateFlip = { ...this.state.flip };
        updateFlip.doFlip = false;
        updateFlip.toFlip = null;

        this.setState({
            flip: updateFlip,
            disable: false
        });

    };

    render() {
        return (
            <section className={classes.Image}>
                <HeadingPrimary />
                <ButtonFilp
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
                        this.state.flip.toFlip ? (
                            <SignInForm
                                change={() => this.flipHandler("s-up")}
                                cancel={this.flipCancelHandler}
                            />
                        ) : (
                            "Sign Up"
                        )
                    }
                />
                <div className={classes.Sign}>
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
