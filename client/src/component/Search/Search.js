import classes from './Search.module.css';
import Inputs from './Inputs/Inputs';
import React from 'react';

const Search = (props) => {
  return (
    <form className={classes.Search} onSubmit={(e) => props.searchCars(e)}>
      <h2>Find Your Car</h2>
      <Inputs
        changeInput={props.changeInput}
        form={props.form}
      />
      <div className={classes.Btn}>
        <button>Search</button>
      </div>
    </form>
  );
};

export default Search;