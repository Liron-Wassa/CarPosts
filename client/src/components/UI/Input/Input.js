import classes from './Input.module.css';
import React from 'react';

const Input = (props) => {

    let inputElement;
    let showMessage = false;

    if(props.isTouched) {
        if (!props.isValid) {
            showMessage = true;
        }
    };

    switch(props.type) {
        case 'number': {
            inputElement = <React.Fragment>
                <input
                    className={classes.Input}
                    type={props.type}
                    placeholder={props.placeholder}
                    name={props.name}
                    onChange={props.changeInput}
                    value={props.value}
                    min={props.min}
                    required={props.required}
                />
                {showMessage ? <em className={classes.Msg}>{props.message}</em> : null}
            </React.Fragment>
            break;
        }
        case 'text': {
            inputElement = <React.Fragment>
                <input
                    className={classes.Input}
                    type={props.type}
                    placeholder={props.placeholder}
                    name={props.name}
                    onChange={props.changeInput}
                    value={props.value}
                    required={props.required}
                />
                {showMessage ? <em className={classes.Msg}>{props.message}</em> : null}
            </React.Fragment>
            break;
        }
        case 'email': {
            inputElement = <React.Fragment>
                <input
                    className={classes.Input}
                    type={props.type}
                    placeholder={props.placeholder}
                    name={props.name}
                    onChange={props.changeInput}
                    value={props.value}
                    required={props.required}
                />
                                {showMessage ? <em className={classes.Msg}>{props.message}</em> : null}
            </React.Fragment>
            break;
        }
        case 'password': {
            inputElement = <React.Fragment>
                <input
                    className={classes.Input}
                    type={props.type}
                    placeholder={props.placeholder}
                    name={props.name}
                    onChange={props.changeInput}
                    value={props.value}
                    required={props.required}
                />
                                {showMessage ? <em className={classes.Msg}>{props.message}</em> : null}
            </React.Fragment>
            break;
        }
        case 'select': {
            inputElement = <select
                name={props.name}
                onChange={props.changeInput}
                defaultValue={props.value}
                disabled={props.disabled}
                required={props.required}
            >
                {props.values.map(value => (
                    <option key={value} value={value}>{value}</option>
                ))}
            </select>
            break;
        }
        default: inputElement = null;
    };

    return inputElement;
};

export default Input;