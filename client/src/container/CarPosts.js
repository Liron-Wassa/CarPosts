import SearchBarVehicles from '../component/SearchBarVehicles/SearchBarVehicles';
import React, { useState, useEffect } from 'react';
import Modal from '../component/UI/Modal/Modal';
import Cars from '../component/Cars/Cars';
import axios from 'axios';

const CarPosts = () => {

    const carForm = {
        modelName: {
            value: ''
        },
        modelType: {
            value: ''
        },
        fromPrice: {
            value: ''
        },
        toPrice: {
            value: ''
        },
        fromYear: {
            value: ''
        },
        toYear: {
            value: ''
        },
        condition: {
            value: ''
        }
    };

    const [isNotFound, setIsNotFound] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [form, seForm] = useState(carForm);
    const [error, setError] = useState('');
    const [cars, setCars] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        axios.get('/cars', {
        }).then(response => {
            if(!response.data.length) setIsNotFound(true);
            setCars(response.data);
            setIsLoading(false);
        }).catch(error => {
            setError(error.message);
            setIsLoading(false);
        });
    }, []);

    const changeInputHandler = (e) => {
        const tempForm = {...form};
        const tempField = {...tempForm[e.target.name]};
        tempField.value = e.target.value;
        tempForm[e.target.name] = tempField;
        if(e.target.name === 'modelName') {
            const tempModelTypeField = {...tempForm.modelType};
            tempModelTypeField.value = 'None';
            tempForm.modelType = tempModelTypeField;
        };
        seForm(tempForm);
    };

    const getQuery = () => {
        const result = {};
        let pattern = ['None', 'From', 'To'];
        for (const key in form) {
            if(form[key].value.trim() && !pattern.includes(form[key].value.trim())) {
                result[key] = form[key].value;
            };
        };
        return result;
    };

    const searchCars = (e) => {
        e.preventDefault();
        const query = getQuery();
        setIsLoading(true);
        axios.get('/cars', {
            params: query
        }).then(response => {
            if(!response.data.length) setIsNotFound(true);
            setCars(response.data);
            setIsLoading(false);
        }).catch(error => {
            setError(error.message);
            setIsLoading(false);
        });
    };

    return (
        <React.Fragment>
            <Modal
                error={error}
                clicked={() => setError('')}
            />
            <SearchBarVehicles
                changeInput={changeInputHandler}
                searchCars={searchCars}
                form={form}
            />
            <Cars 
                cars={cars}
                isLoading={isLoading}
                isNotFound={isNotFound}
            />
        </React.Fragment>
    );
};

export default CarPosts;