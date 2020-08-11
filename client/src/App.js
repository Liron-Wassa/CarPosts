import CarPosts from './containers/CarPosts';
import Layout from './hoc/Layout/Layout';
import React from 'react';

const App = () => {
  return (
    <Layout>
      <CarPosts />
    </Layout>
  );
}

export default App;
