import classes from './RegisterForm.module.css';
import Input from '../../UI/Input/Input';
import React from 'react';

const RegisterForm = (props) => {

    let attachedClasses = [classes.Btn, classes.Allowed];

    if(!props.formIsValid) {
        attachedClasses = [classes.Btn, classes.Disabled];
    };

    return (
        <div className={classes.RegisterForm}>
            <h1>Sign Up</h1>
            <form onSubmit={(event) => props.register(event, props.form)}>
                <div className={classes.Inputs}>
                    <div className={classes.InputBox}>
                        <Input
                            type='text'
                            name='name'
                            changeInput={props.change}
                            value={props.form.name.value}
                            message='Name required'
                            isTouched={props.form.name.touched}
                            isValid={props.form.name.valid}
                            required={true}
                        />
                        <span>Name</span>
                    </div>
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
                    <div className={classes.InputBox}>
                        <Input
                            type='password'
                            name='confirm'
                            changeInput={props.change}
                            value={props.form.confirm.value}
                            message='Must be more than 5 numbers'
                            isTouched={props.form.confirm.touched}
                            isValid={props.form.confirm.valid}
                            required={true}
                        />
                        <span>Confirm</span>
                    </div>
                </div>
                <button
                    className={attachedClasses.join(' ')}
                    disabled={!props.formIsValid}
                >Register</button>
            </form>
            {props.error ? <span>{props.error}</span> : null}
        </div>
    )
};

export default RegisterForm;