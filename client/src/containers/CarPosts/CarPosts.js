import SearchBarVehicles from '../../components/SearchBarVehicles/SearchBarVehicles';
import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Cars from '../../components/Cars/Cars';
import axios from 'axios';

const sourse = axios.CancelToken.source();

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
        axios.get('/cars', {
            cancelToken: sourse.token
        }).then(response => {
            if(!response.data.length) setIsNotFound(true);
            setCars(response.data);
        }).catch(error => {
            if(axios.isCancel(error)) return;
            if (!error.response) setError('Network Error');
            else setError(error.response.data.message);
        });
        return () => {
            sourse.cancel();
        };
    }, []);

    const changeInputHandler = (event) => {
        const tempForm = {...form};
        const tempField = {...tempForm[event.target.name]};
        tempField.value = event.target.value;
        tempForm[event.target.name] = tempField;
        if(event.target.name === 'modelName') {
            const tempModelTypeField = {...tempForm.modelType};
            tempModelTypeField.value = 'None';
            tempForm.modelType = tempModelTypeField;
        };
        seForm(tempForm);
    };

    const getQuery = () => {
        const result = {};
        const pattern = ['None', 'From', 'To'];
        for (const key in form) {
            if(form[key].value.trim() && !pattern.includes(form[key].value.trim())) {
                result[key] = form[key].value;
            };
        };
        return result;
    };

    const searchCars = (event) => {
        event.preventDefault();
        const query = getQuery();
        setIsNotFound(false);
        setIsLoading(true);
        axios.get('/cars', {
            params: query,
            cancelToken: sourse.token
        }).then(response => {
            if(!response.data.length) setIsNotFound(true);
            setCars(response.data);
            setIsLoading(false);
        }).catch(error => {
            if(axios.isCancel(error)) return;
            if (!error.response) setError('Network Error');
            else setError(error.response.data.message);
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