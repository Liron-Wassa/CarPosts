import Register from './containers/Auth/Register/Register';
import { Switch, Route, Redirect } from "react-router-dom";
import CarPosts from './containers/CarPosts/CarPosts';
import Logout from './containers/Auth/Logout/Logout';
import React, { useEffect, useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import Landing from './components/Landing/Landing';
import Login from './containers/Auth/Login/Login';
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
      <Route path='/register' component={Register} />
      <Route path='/login' component={Login} />
      <Redirect to="/" />
    </Switch>
  );

  if(isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/logout' component={Logout} />
        <Route path='/posts' component={CarPosts} />
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