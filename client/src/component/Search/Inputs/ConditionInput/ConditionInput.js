import classes from './ConditionInput.module.css';
import Input from '../../../UI/Input/Input';
import React from 'react';

const ConditionInput = (props) => (
    <div className={classes.ConditionInput}>
        <label>{props.title}</label>
        <div className={classes.Container}>
            <Input
                type='select'
                values={['None', 'New', 'Used']}
                name='condition'
                changeInput={props.changeInput}
                value={props.conditionValue}
            />
        </div>
    </div>
);

export default ConditionInput;