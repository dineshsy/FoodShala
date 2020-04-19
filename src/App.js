import React, { Component } from "react";

import classes from "./App.module.css";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import fetchProductsAction from "./bloc/fetchProducts";
import {
    getProducts,
    getProductsError,
    getProductsPending,
    getUser
} from "./store/reducer";
import IntroPage from "./components/IntroPage/IntroPage";
import AnimatedPages from "./components/AnimatedPages/AnimatedPages";
// Root Component
class App extends Component {
    state = {
        explore: false,
        disAppear: false,
    };

    // fetch menu
    componentWillMount() {
        const { fetchProducts } = this.props;
        fetchProducts();
    }

    exploreHandler = () => {
        var scope = this;
        this.setState({ disAppear: !this.state.disAppear });
        setTimeout(() => {
            scope.setState({ explore: !this.state.explore });
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
                <AnimatedPages
                    disAppear={this.state.disAppear}
                    explore={this.state.explore}
                    mainComponent={<IntroPage onChange={this.exploreHandler} />}
                    subComponent={<IntroPage onChange={this.exploreHandler} />}
                />
            </main>
        );

    }
}

const mapStateToProps = (state) => ({
    products: getProducts(state),
    error: getProductsError(state),
    pending: getProductsPending(state),
    user: getUser(state)
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            fetchProducts: fetchProductsAction,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(App);
