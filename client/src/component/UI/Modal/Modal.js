import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';
import React from 'react';

const Modal = (props) => {
    let attchachedClasses = [classes.Modal, classes.Close];

    if(props.error) {
        attchachedClasses = [classes.Modal, classes.Open];
    };

    return (
        <React.Fragment>
            <Backdrop show={props.error} clicked={props.clicked}/>
            <div className={attchachedClasses.join(' ')}>
                {props.error}
            </div>
        </React.Fragment>
    );
};

export default Modal;