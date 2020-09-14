import { checkValueValidity } from '../../utils/checkValueValidity';
import ResetForm from '../../components/ResetForm/ResetForm';
import React, { useState } from 'react';
import axios from 'axios';

const Reset = (props) => {

    const resetForm = {
        password: {
            value: '',
            validation: {
                isPassword: true
            },
            touched: false,
            valid: false
        },
        confirm: {
            value: '',
            validation: {
                isPassword: true
            },
            touched: false,
            valid: false
        }
    };

    const [resetConfirmed, setResetConfirmed] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState(resetForm);
    const [error, setError] = useState('');

    const resetPassword = (event, form) => {
        event.preventDefault();
        setIsLoading(true);
        axios.patch(`/password/reset/${props.match.params.token}`, {
            password: form.password.value,
            confirm: form.confirm.value
        }).then(response => {
            if(response.status === 201) {
                setResetConfirmed(true);
                setIsLoading(false);
            };
        }).catch(error => {
            if (!error.response) setError('Network Error');
            else setError(error.response.data.message);
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
        <ResetForm
            setResetConfirmed={setResetConfirmed}
            resetConfirmed={resetConfirmed}
            resetPassword={resetPassword}
            change={changeInputHandler}
            formIsValid={formIsValid}
            isLoading={isLoading}
            error={error}
            form={form}
        />
    );
};

export default Reset;