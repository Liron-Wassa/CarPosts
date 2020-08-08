const carModule = require('./modules/car');
const cars = require('./api/cars.json');
const express = require('express');
const app = express();

app.get('/cars', (req, res) => {
    const query = req.query;

    if(Object.keys(query).length) {
        let filterIsValid;

        const filterdCars = cars.filter(car => {
            filterIsValid = true;
            for (const key in query) {
                if(filterIsValid && key === 'modelName') {
                    filterIsValid = carModule.filterByModelName(car, query, key);
                }
                if(filterIsValid && key === 'modelType') {
                    filterIsValid = carModule.filterByModelType(car, query, key);
                }
                if(filterIsValid && key === 'condition') {
                    filterIsValid = carModule.filterByCondition(car, query, key);
                }
                if(filterIsValid && key === 'date') {
                    filterIsValid = carModule.filterByDate(car, query, key);
                }
                if(filterIsValid && key === 'price') {
                    filterIsValid = carModule.filterByPrice(car, query, key);
                };
            };
            return filterIsValid;
        });

        return res.status(200).send(filterdCars);
    };

    const newCars = getCurrenYearCars(cars);

    res.status(200).send(newCars);
});

function getCurrenYearCars(cars) {
    const currentYear = new Date().getFullYear();
    const result = cars.filter(car => {
        return Number(car.date) === currentYear;
    });
    return result;
};

app.listen(process.env.PORT || 5000, () => {
    console.log('server has running!');
});