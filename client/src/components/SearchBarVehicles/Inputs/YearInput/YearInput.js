import classes from './YearInput.module.css';
import Input from '../../../UI/Input/Input';
import React from 'react';

const YearInput = (props) => {

    let startYearValues = ['From', '2020', '2019', '2018', '2017', '2016', '2015', '2014'];
    let endYearValues = ['To', '2020', '2019', '2018', '2017', '2016', '2015', '2014'];

    if(props.fromYearValue && props.fromYearValue !== 'From') {
        let value = Number(props.fromYearValue);
        const maxYears = 2020;
        endYearValues = ['To'];
        while(value <= maxYears) {
            endYearValues.push(`${value}`);
            value++;
        };
    };

    if(props.toYearValue && props.toYearValue !== 'To') {
        let value = Number(props.toYearValue);
        const minYears = 2014;
        startYearValues = ['From'];
        while(value >= minYears) {
            startYearValues.push(`${value}`);
            value--;
        };
    };

    return (
        <div className={classes.YearInput}>
            <label>{props.title}</label>
            <div className={classes.Container}>
                <Input
                    type='select'
                    values={startYearValues}
                    name='fromYear'
                    changeInput={props.changeInput}
                    value={props.fromYearValue}
                />
                <Input
                    type='select'
                    values={endYearValues}
                    name='toYear'
                    changeInput={props.changeInput}
                    value={props.toYearValue}
                />
            </div>
        </div>
    )
};

export default YearInput;