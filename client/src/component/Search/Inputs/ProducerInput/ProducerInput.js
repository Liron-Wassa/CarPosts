import classes from './ProducerInput.module.css';
import Input from '../../../UI/Input/Input';
import React from 'react';

const ProducerInput = (props) => (
    <div className={classes.ProducerInput}>
        <label>{props.title}</label>
        <div className={classes.Container}>
            <Input
                type='select'
                values={['None', 'Mazda', 'Ford', 'Renault', 'Seat']}
                name='producer'
                changeInput={props.changeInput}
                value={props.producerValue}
            />
        </div>
    </div>
);

export default ProducerInput;