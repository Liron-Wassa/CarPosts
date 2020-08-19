import classes from './LoginForm.module.css';
import Input from '../../UI/Input/Input';
import React from 'react';

const LoginForm = (props) => {

    let attachedClasses = [classes.Btn, classes.Allowed];

    if(!props.formIsValid) {
        attachedClasses = [classes.Btn, classes.Disabled];
    };

    return (
        <div className={classes.LoginForm}>
            <h1>Sign In</h1>
            <form onSubmit={(event) => props.login(event, props.form)}>
                <div className={classes.Inputs}>
                    <div className={classes.InputBox}>
                        <Input
                            type='text'
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
                    <div className={classes.InputBox}>
                        <Input
                            type='password'
                            name='password'
                            changeInput={props.change}
                            value={props.form.password.value}
                            message='Must be more than 5 numbers'
                            isTouched={props.form.password.touched}
                            isValid={props.form.password.valid}
                            required={true}
                        />
                        <span>Password</span>
                    </div>
                </div>
                <button
                    className={attachedClasses.join(' ')}
                    disabled={!props.formIsValid}
                >Login</button>
            </form>
            {props.error ? <span>{props.error}</span> : null}
        </div>
    );
}

export default LoginForm;