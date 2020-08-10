import Spinner from '../UI/Spinner/Spinner'
import classes from './Cars.module.css';
import Car from './Car/Car';
import React from 'react';

const Cars = (props) => {
    let carElemets = <Spinner />;
    if(!props.isLoading && props.cars.length) {
        carElemets = props.cars.map(car => (
            <Car key={car.image} car={car} />
        ));
    };
    return <section className={classes.Cars}>
        {props.cars.length ? carElemets :
        <p className={classes.Message}>Not Found!</p>}
    </section>
};

export default Cars;