import RegisterForm from '../../../components/AuthForms/RegisterForm/RegisterForm';
import { AuthContext } from '../../../contexts/AuthContext';
import FacebookLoginWithButton from 'react-facebook-login';
import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

const Register = () => {

    const { register, authWithFacebook, isChangeRoute, registerError, isAuthenticated } = useContext(AuthContext);

    const registerform = {
        name: {
            value: '',
            validation: {
                required: true
            },
            valid: false
        },
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
        },
        confirm: {
            value: '',
            validation: {
                isPassword: true
            },
            valid: false
        }
    };
    
    const [form, setForm] = useState(registerform);
    
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

    if(isChangeRoute) {
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
                change={changeInputHandler}
                error={registerError}
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

export default Register;