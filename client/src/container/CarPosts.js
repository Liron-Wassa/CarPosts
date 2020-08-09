import React, { useState, useEffect } from 'react';
import Modal from '../component/UI/Modal/Modal';
import Search from '../component/Search/Search';
import Cars from '../component/Cars/Cars';
import axios from 'axios';

const CarPosts = () => {

    const carForm = {
        fromPrice: {
            value: ''
        },
        toPrice: {
            value: ''
        },
        condition: {
            value: ''
        },
        fromYear: {
            value: ''
        },
        toYear: {
            value: ''
        },
        model: {
            value: ''
        },
        producer: {
            value: ''
        }
    };

    const [isLoading, setIsLoading] = useState(false);
    const [form, seForm] = useState(carForm);
    const [error, setError] = useState('');
    const [cars, setCars] = useState([]);

      useEffect(() => {
        setIsLoading(true);
        axios.get('/cars').then(response => {
            setCars(response.data);
            setIsLoading(false);
        }).catch(error => {
            setError(error);
            setIsLoading(false);
        });
    }, []);

    const changeInputHandler = (e) => {
        const tempForm = {...form};
        const tempField = {...tempForm[e.target.name]};
        let modelField = null;
        let pattern = ['None', 'From', 'To'];
        if(pattern.includes(e.target.value)) {
            if(e.target.name === 'producer') {
                modelField = {...tempForm.model};
                modelField.value = '';
            }
            tempField.value = '';
        } else {
            tempField.value = e.target.value;
        };
        tempForm[e.target.name] = tempField;
        if(modelField) {
            tempForm.model = modelField;
        };
        seForm(tempForm);
    };

    const searchCars = (e) => {
        e.preventDefault();
        const query = {price: {}, date: {}};
        for (const key in form) {
            if(key === 'condition') query.condition = form[key].value;
            if(key === 'producer') query.modelName = form[key].value;
            if(key === 'model') query.modelType = form[key].value;
            if(key === 'fromPrice') query.price.from = form[key].value;
            if(key === 'fromYear') query.date.from = form[key].value;
            if(key === 'toPrice') query.price.to = form[key].value;
            if(key === 'toYear') query.date.to = form[key].value;
        };
        setIsLoading(true);
        axios.get('/cars', {
            params: query
        }).then(response => {
            setCars(response.data);
            setIsLoading(false);
        }).catch(error => {
            setError(error);
            setIsLoading(false);
        });
    };

    return (
        <React.Fragment>
            <Modal
                error={error}
                clicked={() => setError('')}
            />
            <Search
                changeInput={changeInputHandler}
                searchCars={searchCars}
                form={form}
            />
            <Cars 
                cars={cars}
                isLoading={isLoading}
            />
        </React.Fragment>
    );
};

export default CarPosts;