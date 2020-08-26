import { AuthContext } from '../../../contexts/AuthContext';
import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

const Confirm = (props) => {

    const {
        confirmedError,
        setConfirmedError,
        requestConfirmed,
        setRequestConfirmed,
        confirmAccount
    } = useContext(AuthContext);

    useEffect(() => {
        confirmAccount(props.match.params.token);
        return () => {
            if(confirmedError) {
                setConfirmedError('');
            };
            if(requestConfirmed) {
                setRequestConfirmed(false);
            };
        };
        // eslint-disable-next-line
    }, []);

    if(requestConfirmed) {
        return <Redirect to='/login' />;
    };

    return <h1 style={{textAlign: 'center', marginTop: '100px'}}>{confirmedError}</h1>;
};

export default Confirm;