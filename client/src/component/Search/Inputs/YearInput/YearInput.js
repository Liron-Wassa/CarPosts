import classes from './YearInput.module.css';
import Input from '../../../UI/Input/Input';
import React from 'react';

const YearInput = (props) => (
    <div className={classes.YearInput}>
        <label>{props.title}</label>
        <div className={classes.Container}>
            <Input
                type='select'
                values={['From', '2020', '2019', '2018', '2017', '2016', '2015', '2014']}
                name='fromYear'
                changeInput={props.changeInput}
                value={props.fromYearValue}
            />
            <Input
                type='select'
                values={['To', '2020', '2019', '2018', '2017', '2016', '2015', '2014']}
                name='toYear'
                changeInput={props.changeInput}
                value={props.toYearValue}
            />
        </div>
    </div>
);

export default YearInput;