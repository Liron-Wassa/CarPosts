import React, { useEffect, useState } from 'react';
import classes from './App.module.css';
import axios from 'axios';

const App = () => {

  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get('/cars', {
      params:{
        // modelName: 'ford',
        // type: "focus"
      }
    }).then(res => {
      console.log(res.data);
      setCars(res.data);
    }).catch(err => {
      console.log(err.response);
    });
  }, []);

  return (
    <div className={classes.App}>
      {cars.map(car => {
        return <img key={car.image} src={car.image} alt="car" style={{width: '300px', height: '300px'}}/>
      })}
    </div>
  );
}

export default App;
