const cars = require('./api/cars.json');
const express = require('express');
const app = express();

app.get('/cars', (req, res) => {
    const query = req.query;
    
    if(query.modelType && !query.modelName) {
        return res.sendStatus(404);
    }
    else if(Object.keys(query).length) {
        let filterIsValid;
        const result = cars.filter(car => {
            filterIsValid = true;
            for (const key in query) {
                filterIsValid = checkFilterValidity(key, query, car, filterIsValid);
            };
            return filterIsValid;
        });
        return res.status(200).send(result);
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

function checkFilterValidity(key, query, car, filterIsValid) {
    if(filterIsValid && key === 'modelName') {
        return car[key] === query[key];
    }
    else if(filterIsValid && key === 'modelType') {
        return car[key] === query[key];
    }
    else if(filterIsValid && key === 'fromPrice') {
        return Number(car.price) >= Number(query.fromPrice);
    }
    else if(filterIsValid && key === 'toPrice') {
        return Number(car.price) <= Number(query.toPrice);
    }
    else if(filterIsValid && key === 'fromYear') {
        return Number(car.year) >= Number(query.fromYear);
    }
    else if(filterIsValid && key === 'toYear') {
        return Number(car.year) <= Number(query.toYear);
    }
    else if(filterIsValid && key === 'condition') {
        return car[key] === query[key];
    }
};

app.listen(process.env.PORT || 5000, () => {
    console.log('server has running!');
});