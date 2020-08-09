import CarPosts from './container/CarPosts';
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
