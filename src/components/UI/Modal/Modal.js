import React, { Component } from "react";

import classes from "./Modal.module.css";
import BackDrop from "../BackDrop/BackDrop";
import IconClose from '../../../assets/Tools/close icon.svg'

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <React.Fragment>
        <BackDrop show={this.props.show} clicked={this.props.popModal} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
            <div className={classes.Close}
              onClick={this.props.popModal}
            >
              <img src={IconClose} alt="close"/>
            </div>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
