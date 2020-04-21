import React, { Component } from "react";

import classes from "./App.module.css";

import IntroPage from "./components/IntroPage/IntroPage";
import AnimatedPages from "./components/AnimatedPages/AnimatedPages";
import ExploreBuilder from "./container/ExploreBuilder/ExploreBuilder";
import { Route } from "react-router-dom";

// Root Component
export default class App extends Component {
    state = {
        explore: false,
        disAppear: false,
    };

    exploreHandler = () => {
        var scope = this;
        this.setState({ disAppear: !this.state.disAppear });
        setTimeout(() => {
            scope.setState({ explore: true });
        }, 300);
    };

    componentDidUpdate(prevProps, prevState) {
        if(this.props.user !== prevProps.user ) {
            setTimeout(() => {
                this.exploreHandler()
            }, 300);
        }
    }

    render() {
        return (
            <main className={classes.Main}>
                <Route
                path= "/"
                    render={
                        () =>
                        <AnimatedPages
                            disAppear={this.state.disAppear}
                            explore={this.state.explore}
                            mainComponent={
                                <IntroPage onChange={this.exploreHandler} />
                            }
                            subComponent={<ExploreBuilder />}
                        />
                    }
                />
            </main>
        );

    }
}