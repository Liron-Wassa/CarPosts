import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
 
    const [requestConfirmed, setRequestConfirmed] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loadUserData, setLoadUserData] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const [confirmedError, setConfirmError] = useState('');
    const [logoutError, setLogoutError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [message, setMessage] = useState('');
    
    const tryAutoLogin = () => {
        const userId = JSON.parse(localStorage.getItem('userId'));
        if(!userId) {
            logout();
        }
        else {
            checkUserConnection();
        };
    };

    const checkUserConnection = () => {
        setLoadUserData(true);
        axios.get('/user').then(response => {
            if(response.status === 200 && response.data) {
                localStorage.setItem('userId', JSON.stringify(response.data.userId));
                setIsAuthenticated(true);
            }
            else {
                localStorage.removeItem('userId');
                setIsAuthenticated(false);
            };
            setLoadUserData(false);
        });
    };

    const authWithFacebook = (name, email, facebookId) => {
        setLoginError('');
        axios.post('/user/auth/facebook', {
            name: name,
            email: email,
            facebookId: facebookId,
            password: facebookId
        }).then(response => {
            localStorage.setItem('userId', JSON.stringify(response.data.userId));
            setIsAuthenticated(true);
        }).catch(error => {
            if (!error.response) setLoginError(error.message);
            else setLoginError(error.response.data.message);
        });
    };

    const login = (event, form) => {
        setIsLoading(true);
        event.preventDefault();
        setLoginError('');
        axios.post('/user/login', {
            email: form.email.value.toLowerCase(),
            password: form.password.value
        }).then(response => {
            localStorage.setItem('userId', JSON.stringify(response.data.userId));
            setIsLoading(false);
            setIsAuthenticated(true);
        }).catch(error => {
            if (!error.response) setLoginError(error.message);
            else setLoginError(error.response.data.message);
            setIsLoading(false);
        });
    };

    const register = (event, form) => {
        setIsLoading(true);
        event.preventDefault();
        setRegisterError('');       
        axios.post('/user/register', {
            name: form.name.value,
            email: form.email.value.toLowerCase(),
            password: form.password.value,
            confirm: form.confirm.value
        }).then(response => {
            if(response.status === 201) {
                setIsLoading(false);
                setMessage(response.data.message);
            };
        }).catch(error => {
            if (!error.response) setRegisterError(error.message);
            else setRegisterError(error.response.data.message);
            setIsLoading(false);
        });
    };

    const confirmAccount = (token) => {
        setConfirmError('');
        axios.post(`/user/confirm/${token}`).then(response => {
            setRequestConfirmed(true);
        }).catch(error => {
            if (!error.response) setConfirmError(error.message);
            else setConfirmError(error.response.data.message);
        });
    };

    const logout = () => {
        setLoginError('');
        axios.get('/user/logout').then(response => {
            if(response.status === 200) {
                localStorage.removeItem('userId');
                setIsAuthenticated(false);
            };
        }).catch(error => {
            setLoginError(error.message);
        });
    };

    return (
        <AuthContext.Provider value={{
            login,
            logout,
            register,
            setMessage,
            tryAutoLogin,
            setLoginError,
            setLogoutError,
            confirmAccount,
            setConfirmError,
            setRegisterError,
            authWithFacebook,
            setRequestConfirmed,
            requestConfirmed,
            isAuthenticated,
            confirmedError,
            registerError,
            loadUserData,
            logoutError,
            loginError,
            isLoading,
            message
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;