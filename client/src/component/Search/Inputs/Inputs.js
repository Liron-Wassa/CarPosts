import ConditionInput from './ConditionInput/ConditionInput';
import ProducerlInput from './ProducerInput/ProducerInput';
import ModelInput from './ModelInput/ModelInput';
import PriceInput from './PriceInput/PriceInput';
import YearInput from './YearInput/YearInput';
import classes from './Inputs.module.css';
import React from 'react';

const Inputs = (props) => {
  return (
      <div className={classes.Inputs}>
        <PriceInput
            title='Price'
            changeInput={props.changeInput}
            fromPriceValue={props.form.fromPrice.value}
            toPriceValue={props.form.toPrice.value}
        />
        <ConditionInput
            title='Condition'
            changeInput={props.changeInput}
            conditionValue={props.form.condition.value}
        />
        <YearInput
            title='Year'
            changeInput={props.changeInput}
            fromYearValue={props.form.fromYear.value}
            toYearValue={props.form.toYear.value}
        />
        <ModelInput
            title='Model'
            changeInput={props.changeInput}
            modelValue={props.form.model.value}
            producerValue={props.form.producer.value}
        />
        <ProducerlInput
            title='Producer'
            changeInput={props.changeInput}
            producerValue={props.form.producer.value}
        />
      </div>
  );
};

export default Inputs;