import LoginForm from '../../../components/AuthForms/LoginForm/LoginForm';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import FacebookLoginWithButton from 'react-facebook-login';
import { Redirect } from 'react-router-dom';

const Login = () => {

    const { login, authWithFacebook, isAuthenticated, loginError, setIsChangeRoute } = useContext(AuthContext);

    useEffect(() => {
        setIsChangeRoute(false);
    }, [setIsChangeRoute]);

    const loginForm = {
        email: {
            value: '',
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
        }
    };
    
    const [form, setForm] = useState(loginForm);
    
    const changeInputHandler = (event) => {
        const tempForm = {...form};
        const tempField = tempForm[event.target.name];
        tempField.value = event.target.value;
        tempForm[event.target.name] = tempField;
        setForm(tempForm);
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
                form={form}
                change={changeInputHandler}
                error={loginError}
            />
            <FacebookLoginWithButton
                appId="651865205423153"
                fields="name,email,picture"
                callback={responseFacebook}
                redirectUri={true}
                // cssClass={faceBookLoginButton}
                // icon="fa-facebook"
            />
        </React.Fragment>
    );
};

export default Login;