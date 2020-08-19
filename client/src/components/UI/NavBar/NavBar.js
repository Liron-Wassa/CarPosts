import { AuthContext } from '../../../contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import classes from './NavBar.module.css';
import React, { useContext } from 'react';

const NavBar = () => {

    const { isAuthenticated } = useContext(AuthContext);

    return (
        <nav className={classes.NavBar}>
            <ul>
                {isAuthenticated ?
                    <div className={classes.Logout}>
                        <li><NavLink to='/logout'>Logout</NavLink></li>
                    </div>
                    :
                    <div className={classes.Links}>
                        <li><NavLink to='/register'>Sign Up</NavLink></li>
                        <li><NavLink to='/login'>Sign In</NavLink></li>
                    </div>
                }
            </ul>
        </nav>
    );
};

export default NavBar;