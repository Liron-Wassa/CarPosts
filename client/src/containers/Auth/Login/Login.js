import LoginForm from '../../../components/AuthForms/LoginForm/LoginForm';
import { checkValueValidity } from '../../../utils/checkValueValidity';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import FacebookLoginWithButton from 'react-facebook-login';
import { Redirect } from 'react-router-dom';

const Login = () => {

    const {
        login,
        isLoading,
        authWithFacebook,
        isAuthenticated,
        loginError,
        setLoginError,
    } = useContext(AuthContext);

    useEffect(() => {
        return () => {
            if(loginError) {
                setLoginError('');
            };
        };
        // eslint-disable-next-line
    }, []);

    const loginForm = {
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
            touched: false,
            validation: {
                isPassword: true
            },
            valid: false
        }
    };
    
    const [formIsValid, setFormIsValid] = useState(false);
    const [form, setForm] = useState(loginForm);
    
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

    if(isAuthenticated) {
        return <Redirect to='/posts' />
    };

    return (
        <React.Fragment>
            <LoginForm
                login={login}
                isLoading={isLoading}
                form={form}
                change={changeInputHandler}
                error={loginError}
                formIsValid={formIsValid}
            />
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <FacebookLoginWithButton
                    appId="651865205423153"
                    fields="name,email,picture"
                    callback={responseFacebook}
                    redirectUri={true}
                    icon="fa-facebook"
                    textButton='sign in with facebook'
                    disableMobileRedirect={true}
                    isMobile={false}
                />
            </div>
        </React.Fragment>
    );
};

export default Login;