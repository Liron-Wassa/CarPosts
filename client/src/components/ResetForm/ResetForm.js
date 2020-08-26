import classes from './ResetForm.module.css';
import { Redirect } from 'react-router-dom';
import Spinner from '../UI/Spinner/Spinner';
import Input from '../UI/Input/Input';
import React from 'react';

const ResetForm = (props) => {

    let attachedClasses = [classes.Btn, classes.Allowed];

    if(!props.formIsValid) {
        attachedClasses = [classes.Btn, classes.Disabled];
    };

    if(props.resetConfirmed) {
        return <Redirect to='/login' />;
    };

    return (
        <div className={classes.ResetForm}>
            <h1>Reset Password</h1>
            <form onSubmit={(event) => props.resetPassword(event, props.form)}>
                <div className={classes.Inputs}>
                    <div className={classes.InputBox}>
                        <Input
                            type='password'
                            name='password'
                            changeInput={props.change}
                            value={props.form.password.value}
                            message='Must be 6 or more character [a-z,A-Z,0-9]'
                            isTouched={props.form.password.touched}
                            isValid={props.form.password.valid}
                            required={true}
                        />
                        <span>New Password</span>
                    </div>
                    <div className={classes.InputBox}>
                        <Input
                            type='password'
                            name='confirm'
                            changeInput={props.change}
                            value={props.form.confirm.value}
                            message='Must be 6 or more character [a-z,A-Z,0-9]'
                            isTouched={props.form.confirm.touched}
                            isValid={props.form.confirm.valid}
                            required={true}
                        />
                        <span>Confirm Password</span>
                    </div>
                </div>
                <button
                    className={attachedClasses.join(' ')}
                    disabled={!props.formIsValid}
                >Submit</button>
            </form>
            {props.error ? <span>{props.error}</span> : null}
            {props.isLoading ? <Spinner width='5em' height='5em' /> : null}
        </div>
    );
};

export default ResetForm;