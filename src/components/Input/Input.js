import React from "react";
import classes from "./Input.module.css";
import IconCheck from "../../assets/Tools/Icon-Check.png";
import PrimaryTag from "../UI/Tags/PrimaryTag/PrimaryTag";
const input = (props) => {
    let inputElement;
    let inputClasses = [props.isTag?classes.Checkbox:classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    switch (props.elementType) {
        case "input":
            if (!props.isTag && !props.isPassword)
                inputElement = (
                    <input
                        onKeyPress={(event) => {
                            if (event.which === 13) {
                                event.preventDefault();
                                return false;
                            }
                        }}
                        className={inputClasses.join(" ")}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}
                    />
                );
           
            else
                inputElement = (
                    <React.Fragment>
                        <div className={inputClasses.join(" ")}>
                            <input
                                {...props.elementConfig}
                                onChange={props.changed}
                                value={props.value}
                                onKeyPress={(event) => {
                                    const keyCode =
                                        event.keyCode || event.which;
                                    if (keyCode === 13 || keyCode === 9) {
                                        props.addTag();
                                    }
                                }}
                            />

                            {props.actions ? (
                                <img
                                    onClick={props.addTag}
                                    src={IconCheck}
                                    alt="Icon-Check"
                                />
                            ) : null}
                        </div>
                        <div className={classes.SelectedItems}>
                            {props.selected.map((ele, i) => {
                                return (
                                    <PrimaryTag
                                        key={i}
                                        name={ele}
                                        clicked={() => props.removeTag(i)}
                                    />
                                );
                            })}
                        </div>
                    </React.Fragment>
                );
            break;
        case "textarea":
            inputClasses.push(classes.TextArea);
            inputElement = (
                <div className={classes.TextAreaContainer}>
                    <textarea
                        className={inputClasses.join(" ")}
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}
                    />
                </div>
            );

            break;
        case "select":
            inputElement = (
                <select
                    className={inputClasses.join(" ")}
                    value={props.value}
                    onChange={props.changed}
                    style={
                        props.value === ""
                            ? {
                                  color: "rgba(0,0,0,.58)",
                                  backgroundColor: "#fff",
                              }
                            : {
                                  color: "rgba(0,0,0,.88)",
                                  backgroundColor: "#fff",
                              }
                    }
                >
                    {props.elementConfig.option.map((el) => (
                        <option
                            key={el.value}
                            value={el.value}
                            style={
                                el.value === ""
                                    ? {
                                          color: "rgba(0,0,0,.58)",
                                          backgroundColor: "#fff",
                                      }
                                    : {
                                          color: "rgba(0,0,0,.88)",
                                          backgroundColor: "#fff",
                                      }
                            }
                        >
                            {el.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;

        default:
            inputElement = (
                <input
                    className={inputClasses.join(" ")}
                    {...props.elementConfig}
                />
            );
    }

    return (
        <div
            className={
                props.isTag || props.elementType === "textarea" 
                    ? classes.InputCheckbox
                    : classes.Input
            }
        >
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;
