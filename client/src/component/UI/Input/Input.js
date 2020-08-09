import classes from './Input.module.css';
import React from 'react';

const Input = (props) => {

    let selectElement;

    switch(props.type) {
        case 'number': {
            selectElement = <input
                className={classes.Input}
                type={props.type}
                placeholder={props.placeholder}
                name={props.name}
                onChange={props.changeInput}
                value={props.value}
            />
            break;
        }
        case 'select': {
            selectElement = <select
                className={!props.value ? classes.Blank : null}
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
        default: selectElement = null;
    };

    return selectElement;
};

export default Input;