import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loadUserData, setLoadUserData] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    
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
        axios.post('/auth/facebook', {
            name: name,
            email: email,
            facebookId: facebookId,
            password: facebookId
        }).then(response => {
            localStorage.setItem('userId', JSON.stringify(response.data.userId));
            setIsAuthenticated(true);
        }).catch(error => {
            setLoginError(error.response.data.message);
        });
    };

    const login = (event, form) => {
        setIsLoading(true);
        event.preventDefault();
        setLoginError('');
        axios.post('/login', {
            email: form.email.value,
            password: form.password.value
        }).then(response => {
            localStorage.setItem('userId', JSON.stringify(response.data.userId));
            setIsLoading(false);
            setIsAuthenticated(true);
        }).catch(error => {
            setIsLoading(false);
            setLoginError(error.response.data.message);
        });
    };

    const register = (event, form) => {
        setIsLoading(true);
        event.preventDefault();
        setRegisterError('');       
        axios.post('/register', {
            name: form.name.value,
            email: form.email.value,
            password: form.password.value,
            confirm: form.confirm.value
        }).then(response => {
            if(response.status === 201) {
                setIsLoading(false);
                setIsSignUp(true);
            };
        }).catch(error => {
            setIsLoading(false);
            setRegisterError(error.response.data.message);
        });
    };

    const logout = () => {
        axios.get('/logout').then(response => {
            if(response.status === 200) {
                localStorage.removeItem('userId');
                setIsAuthenticated(false);
            };
        });
    };

    return (
        <AuthContext.Provider value={{
            logout,
            register,
            login,
            tryAutoLogin,
            setIsSignUp,
            authWithFacebook,
            setRegisterError,
            setLoginError,
            loadUserData,
            isLoading,
            isSignUp,
            registerError,
            loginError,
            isAuthenticated
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;