import classes from './RegisterForm.module.css';
import Input from '../../UI/Input/Input';
import React from 'react';

const RegisterForm = (props) => {
    return (
        <div className={classes.RegisterForm}>
            <h1>Sign Up</h1>
            <form onSubmit={(event) => props.register(event, props.form)}>
                <Input
                    type='text'
                    name='name'
                    placeholder='Name'
                    changeInput={props.change}
                    value={props.form.name.value}
                />
                <Input
                    type='email'
                    name='email'
                    placeholder='Email'
                    changeInput={props.change}
                    value={props.form.email.value}
                />
                <Input
                    type='password'
                    name='password'
                    placeholder='Password'
                    changeInput={props.change}
                    value={props.form.password.value}
                />
                <Input
                    type='password'
                    name='confirm'
                    placeholder='Confirm password'
                    changeInput={props.change}
                    value={props.form.confirm.value}
                />
                <button>Register</button>
            </form>
            {props.error ? <span>{props.error}</span> : null}
        </div>
    )
};

export default RegisterForm;