import classes from './PriceInput.module.css';
import Input from '../../../UI/Input/Input';
import React from 'react';

const PriceInput = (props) => (
    <div className={classes.PriceInput}>
        <label>{props.title}</label>
        <div className={classes.Container}>
            <Input
                type='number'
                placeholder='From'
                name='fromPrice'
                changeInput={props.changeInput}
                value={props.fromPriceValue}
            />
            <Input
                type='number'
                placeholder='To'
                name='toPrice'
                changeInput={props.changeInput}
                value={props.toPriceValue}
            />
        </div>
    </div>
);

export default PriceInput;