import Spinner from '../UI/Spinner/Spinner'
import classes from './Cars.module.css';
import Car from './Car/Car';
import React from 'react';

const Cars = (props) => {
    let carElemets = <Spinner />;
    if(!props.isLoading) {
        carElemets = props.cars.map(car => (
            <Car key={car.image} car={car} />
        ));
    };
    return <section className={classes.Cars}>{carElemets}</section>
};

export default Cars;