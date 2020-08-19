import classes from './LoginForm.module.css';
import Input from '../../UI/Input/Input';
import React from 'react';

const LoginForm = (props) => {
    return (
        <div className={classes.LoginForm}>
            <h1>Sign In</h1>
            <form onSubmit={(event) => props.login(event, props.form)}>
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
                <button>Login</button>
            </form>
            {props.error ? <span>{props.error}</span> : null}
        </div>
    );
}

export default LoginForm;