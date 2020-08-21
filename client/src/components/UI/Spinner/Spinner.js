import classes from './Spinner.module.css';
import React from 'react';

const Spinner = (props) => (
    <div className={classes.Loader} style={{width: props.width, height: props.height}}>Loading...</div>
);

export default Spinner;