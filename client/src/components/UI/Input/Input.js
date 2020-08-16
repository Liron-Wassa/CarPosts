import classes from './Input.module.css';
import React from 'react';

const Input = (props) => {

    let inputElement;

    switch(props.type) {
        case 'number': {
            inputElement = <input
                className={classes.Input}
                type={props.type}
                placeholder={props.placeholder}
                name={props.name}
                onChange={props.changeInput}
                value={props.value}
                min={props.min}
            />
            break;
        }
        case 'select': {
            inputElement = <select
                name={props.name}
                onChange={props.changeInput}
                defaultValue={props.value}
                disabled={props.disabled}
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