import classes from './SearchBarVehicles.module.css';
import Inputs from './Inputs/Inputs';
import React from 'react';

const SearchBarVehicles = (props) => {

  const buttonStyle = classes.Allowed;

  return (
    <form className={classes.SearchBarVehicles} onSubmit={(event) => props.searchCars(event)}>
      <h2>Find Your Car</h2>
      <Inputs
        changeInput={props.changeInput}
        form={props.form}
      />
      <div className={classes.Btn}>
        <button
          className={buttonStyle}
        >Search</button>
      </div>
    </form>
  );
};

export default SearchBarVehicles;