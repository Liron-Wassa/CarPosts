import AuthContextProvider from './contexts/AuthContext';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React from 'react';
import axios from 'axios';
import App from './App';
import './index.css';

axios.interceptors.request.use(config => {
  console.log(config);
  return config;
}, error => {
  console.log(error);
  console.log(error.messgae);
  console.log(error.response);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  return response;
}, error => {
  return Promise.reject(error);
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
