import { AuthContext } from '../../../contexts/AuthContext';
import Modal from '../../../components/UI/Modal/Modal';
import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

const Logout = () => {

    const { logout, logoutError, setLogoutError } = useContext(AuthContext);

    let logoutElement = <Redirect to='/' />;

    if(logoutError) {
        logoutElement = (
            <Modal
                error={logoutError}
                clicked={() => setLogoutError('')}
            />
        );
    };
    
    useEffect(() => {
        logout();
        // eslint-disable-next-line
    }, []);

    return logoutElement;
};

export default Logout;