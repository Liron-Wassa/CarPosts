import classes from './Car.module.css';
import React from 'react';

const Car = (props) => (
    <div className={classes.Car}>
        <div className={classes.Condition}>
            <div><p>Condition</p> <em>{props.car.condition}</em></div>
        </div>
        <div className={classes.Details}>
            <div><p>Date</p> <em>{props.car.year}</em></div>
            <div><p>Price</p> <em>${props.car.price}</em></div>
        </div>
        <div className={classes.CarModel}>
            <div>
                <div><p>{props.car.modelName}</p></div>
                <div><p>{props.car.modelType}</p></div>
            </div>
            <img src={props.car.image}  alt='car' />
        </div>
    </div>
);

export default Car;