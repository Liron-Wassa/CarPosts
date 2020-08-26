import classes from './ForgotForm.module.css';
import Spinner from '../UI/Spinner/Spinner';
import Input from '../UI/Input/Input';
import React from 'react';

const ForgotForm = (props) => {

    let attachedClasses = [classes.Btn, classes.Allowed];

    if(!props.formIsValid) {
        attachedClasses = [classes.Btn, classes.Disabled];
    };

    return (
        <div className={classes.ForgotForm}>
            <h1>Reset Your Password</h1>
            <em>Enter your email address & we'll send you a link to reset your password.</em>
            <form onSubmit={(event) => props.sendPasswordResetEmail(event, props.form)}>
                <div className={classes.Inputs}>
                    <div className={classes.InputBox}>
                        <Input
                            type='email'
                            name='email'
                            changeInput={props.change}
                            value={props.form.email.value}
                            message='Must be valid email'
                            isTouched={props.form.email.touched}
                            isValid={props.form.email.valid}
                            required={true}
                        />
                        <span>Email</span>
                    </div>
                </div>
                <div className={classes.Container}>
                    <button
                        className={attachedClasses.join(' ')}
                        disabled={!props.formIsValid}
                    >Submit</button>
                    {props.message ? <span>{props.message}</span> : null}
                </div>
            </form>
            {props.error ? <span>{props.error}</span> : null}
            {props.isLoading ? <Spinner width='5em' height='5em' /> : null}
        </div>
    );
};

export default ForgotForm;