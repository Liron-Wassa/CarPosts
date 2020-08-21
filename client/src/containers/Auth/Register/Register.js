import RegisterForm from '../../../components/AuthForms/RegisterForm/RegisterForm';
import { checkValueValidity } from '../../../utils/checkValueValidity';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import FacebookLoginWithButton from 'react-facebook-login';
import { Redirect } from 'react-router-dom';

const Register = () => {

    const {
        register,
        isLoading,
        authWithFacebook,
        isSignUp,
        setIsSignUp,
        registerError,
        setRegisterError,
        isAuthenticated
    } = useContext(AuthContext);

    useEffect(() => {
        return () => {
            setIsSignUp(false);
            if(registerError) {
                setRegisterError('');
            };
        };
    }, [setIsSignUp, registerError, setRegisterError]);

    const registerform = {
        name: {
            value: '',
            touched: false,
            validation: {
                required: true
            },
            valid: false
        },
        email: {
            value: '',
            touched: false,
            validation: {
                isEmail: true
            },
            valid: false
        },
        password: {
            value: '',
            validation: {
                isPassword: true
            },
            valid: false
        },
        confirm: {
            value: '',
            touched: false,
            validation: {
                isPassword: true
            },
            valid: false
        }
    };

    const [formIsValid, setFormIsValid] = useState(false);
    const [form, setForm] = useState(registerform);
    
    const changeInputHandler = (event) => {
        const tempForm = {...form};
        const tempField = tempForm[event.target.name];
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
    
    const responseFacebook = (response) => {
        const name = response.name;
        const email = response.email;
        const token = response.accessToken;
        const facebookId = response.id;
        authWithFacebook(name, email, facebookId, token);
    };

    if(isSignUp) {
        return <Redirect to='/login' />;
    };

    if(isAuthenticated) {
        return <Redirect to='/posts' />;
    };

    return (
        <React.Fragment>
            <RegisterForm
                register={register}
                form={form}
                isLoading={isLoading}
                change={changeInputHandler}
                error={registerError}
                formIsValid={formIsValid}
            />
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <FacebookLoginWithButton
                    appId="651865205423153"
                    fields="name,email,picture"
                    callback={responseFacebook}
                    redirectUri={true}
                    icon="fa-facebook"
                    textButton='continue with facebook'
                />
            </div>
        </React.Fragment>
    );
};

export default Register;