import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChangeRoute, setIsChangeRoute] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [isLogout, setIsLogout] = useState(false);
    
    const tryAutoLogin = () => {
        const userId = localStorage.getItem('userId');
        if(!userId) {
            logout();
        }
        else {
            checkUserConnection();
        };
    };

    const checkUserConnection = () => {
        axios.get('/user').then(response => {
            if(response.status === 200 && response.data) {
                localStorage.setItem('userId', response.data.userId);
                setIsAuthenticated(true);
            }
            else {
                localStorage.removeItem('userId');
                setIsAuthenticated(false);
            };
        });
    };

    // const authWithFacebook = (name, email, facebookId) => {
    //     axios.get('/auth/facebook').then(response => {
    //         console.log(response);
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // };

    const authWithFacebook = (name, email, facebookId) => {
        axios.post('/auth/facebook', {
            name: name,
            email: email,
            facebookId: facebookId,
            password: facebookId
        }).then(response => {
            localStorage.setItem('userId', response.data.userId);
            setIsLogout(false);
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
            localStorage.setItem('userId', response.data.userId);
            setIsLogout(false);
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
                setIsChangeRoute(true);
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
                setIsLogout(true);
                setIsAuthenticated(false);
            };
        });
    };

    return <AuthContext.Provider value={{
        logout,
        register,
        login,
        tryAutoLogin,
        setIsChangeRoute,
        authWithFacebook,
        isLoading,
        isChangeRoute,
        registerError,
        loginError,
        isAuthenticated,
        isLogout
    }}>
        {props.children}
    </AuthContext.Provider>
};

export default AuthContextProvider;