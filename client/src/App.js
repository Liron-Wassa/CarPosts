import Register from './containers/Auth/Register/Register';
import { Switch, Route, Redirect } from "react-router-dom";
import Confirm from './containers/Auth/Confirm/Confirm';
import CarPosts from './containers/CarPosts/CarPosts';
import Logout from './containers/Auth/Logout/Logout';
import React, { useEffect, useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import Landing from './components/Landing/Landing';
import Login from './containers/Auth/Login/Login';
import Forgot from './containers/Forgot/Forgot';
import Reset from './containers/Reset/Reset';
import Layout from './hoc/Layout/Layout';

const App = () => {

  const { isAuthenticated, tryAutoLogin, loadUserData } = useContext(AuthContext);

  useEffect(() => {
    tryAutoLogin();
    // eslint-disable-next-line
  }, []);

  let routes = (
    <Switch>
      <Route exact path='/' component={Landing} />
      <Route path='/confirm/:token' component={Confirm} />
      <Route path='/reset/:token' component={Reset} />
      <Route path='/register' component={Register} />
      <Route path='/forgot' component={Forgot} />
      <Route path='/login' component={Login} />
      <Redirect to="/" />
    </Switch>
  );

  if(isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/posts' component={CarPosts} />
        <Route path='/logout' component={Logout} />
        <Route path='/login' component={Login} />
        <Redirect to="/posts" />
      </Switch>
    );
  };

  if(loadUserData) {
    return null;
  };

  return (
    <Layout>
      {routes}
    </Layout>
  );
};

export default App;