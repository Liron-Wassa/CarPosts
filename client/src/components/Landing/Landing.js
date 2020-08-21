import classes from './Landing.module.css';
import React from 'react';

const Landing = () => (
    <div className={classes.Landing}>
        <div className={classes.LandingHeader}>
            <h1 className={classes.Header}>Welcome To Our Site!</h1>
        </div>
        <ul className={classes.Slideshow}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul> 
    </div>
);

export default Landing;