import { checkValueValidity } from '../../utils/checkValueValidity';
import ForgotForm from '../../components/ForgotForm/ForgotForm';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Forgot = () => {

    const forgotForm = {
        email: {
            value: '',
            validation: {
                isEmail: true
            },
            touched: false,
            valid: false
        }
    };
    
    const [formIsValid, setFormIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState(forgotForm);
    const [message, setMessage] = useState('');
    const [error, setError] = useState();

    useEffect(() => {
        return () => {
            if(error) {
                setError('');
            };
            if(message) {
                setMessage('');
            };
        };
        // eslint-disable-next-line
    }, []);
            
    const sendPasswordResetEmail = (event, form) => {
        event.preventDefault();
        setIsLoading(true);
        axios.post('/password/forgot', {
            email: form.email.value
        }).then(response => {
            if(response.status === 201) {
                setMessage(response.data.message);
                setIsLoading(false);
            };
        }).catch(error => {
            setError(error.response.data.message);
            setMessage('');
            setIsLoading(false);
        });
    };

    const changeInputHandler = (event) => {
        const tempForm = {...form};
        const tempField = {...tempForm[event.target.name]};
        tempField.value = event.target.value;
        tempField.touched = true;
        tempField.valid = checkValueValidity(event.target.value, tempField.validation);
        tempForm[event.target.name] = tempField;
        const formIsValid = checkFormValidity(tempForm);
        setFormIsValid(formIsValid);
        setForm(tempForm);
    };

    const checkFormValidity = (form) => {
        let formIsValid = true;
        for (const key in form) {
            formIsValid = form[key].valid && formIsValid;
        };
        return formIsValid;
    };

    return (
        <ForgotForm
            sendPasswordResetEmail={sendPasswordResetEmail}
            change={changeInputHandler}
            formIsValid={formIsValid}
            isLoading={isLoading}
            error={error}
            message={message}
            form={form}
        />
    );
};

export default Forgot;