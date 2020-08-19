const cars = require('../api/cars.json');
const express = require('express');
const router = express.Router();

router.get('/cars', (req, res) => {
    const query = req.query;
    if(query.modelType && !query.modelName) {
        return res.status(404).json({
            message: 'Request failed'
        });
    }
    else if(Object.keys(query).length) {
        const filterdCars = flterCars(query);
        return res.status(200).send(filterdCars);
    };
    const newCars = getCurrenYearCars(cars);
    res.status(200).send(newCars);
});

function getCurrenYearCars(cars) {
    const currentYear = new Date().getFullYear();
    const result = cars.filter(car => {
        return Number(car.year) === currentYear;
    });
    return result;
};

function flterCars(query) {
    let filterIsValid;
    const result = cars.filter(car => {
        filterIsValid = true;
        for (const key in query) {
            if(filterIsValid && key === 'fromPrice') {
                filterIsValid = Number(car.price) >= Number(query.fromPrice);
            }
            else if(filterIsValid && key === 'toPrice') {
                filterIsValid = Number(car.price) <= Number(query.toPrice);
            }
            else if(filterIsValid && key === 'fromYear') {
                filterIsValid = Number(car.year) >= Number(query.fromYear);
            }
            else if(filterIsValid && key === 'toYear') {
                filterIsValid = Number(car.year) <= Number(query.toYear);
            }
            else if(filterIsValid) {
                filterIsValid = car[key] === query[key];
            }
        };
        return filterIsValid;
    });
    return result;
};

module.exports = router;