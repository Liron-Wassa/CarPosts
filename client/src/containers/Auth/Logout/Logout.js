import { AuthContext } from '../../../contexts/AuthContext';
import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

const Logout = () => {

    const { logout } = useContext(AuthContext);
    
    useEffect(() => {
        logout();
        // eslint-disable-next-line
    }, []);

    return <Redirect to='/' />;
};

export default Logout;