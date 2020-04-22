import React, { Component } from "react";
import classes from "./Navbar.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

import { getUser } from "../../store/reducer";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHandsHelping,
    faUserNinja,
    faShoppingCart,
    faCarrot,
    faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";

class Navbar extends Component {
    state = {
        hover: false,
    };

    toggleHover = () => {
        this.setState({ hover: !this.state.hover });
    };

    render() {
        return (
            <div className={classes.Navbar}>
                <div className={classes["Item"]}>
                    <a href="/">
                        <NavigationItem reload link="/" logo name="FoodShala" />
                    </a>
                </div>
                <div className={classes["Item"]}>
                    {!this.props.user ? (
                        <div
                            className={classes.SignIn}
                            onClick={() => this.props.showModal("s-in")}
                        >
                            <FontAwesomeIcon icon={faUserNinja} />
                            <span>Sign In</span>
                        </div>
                    ) : this.props.user.accountType === "Customer" ? (
                        <NavigationItem
                            exact
                            img={<FontAwesomeIcon icon={faCarrot} />}
                            link="/myorders"
                            name="My Orders"
                        />
                    ) : (
                        <div onClick={() => this.props.showModal("addMenu")}>
                            <NavigationItem
                                exact
                                img={<FontAwesomeIcon icon={faPlusSquare} />}
                                link="/"
                                name="Add Menu"
                            />
                        </div>
                    )}
                    {this.props.user === null ||
                    this.props.user.accountType === "Customer" ? (
                        <NavigationItem
                            exact
                            link="/cart"
                            img={<FontAwesomeIcon icon={faShoppingCart} />}
                            name="Cart"
                        />
                    ) : (
                        <NavigationItem
                            exact
                            link="/orders"
                            img={<FontAwesomeIcon icon={faCarrot} />}
                            name="Orders"
                        />
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: getUser(state),
});

export default connect(mapStateToProps)(Navbar);
