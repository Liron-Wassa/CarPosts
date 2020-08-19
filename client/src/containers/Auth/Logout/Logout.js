import Spinner from '../../../components/UI/Spinner/Spinner';
import { AuthContext } from '../../../contexts/AuthContext';
import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

const Logout = () => {

    const { logout, isLogout } = useContext(AuthContext);
    
    useEffect(() => {
        logout();
        // eslint-disable-next-line
    }, []);

    return (
        isLogout ? <Redirect to='/' /> : <Spinner />
    );
};

export default Logout;