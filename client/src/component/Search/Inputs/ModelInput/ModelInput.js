import classes from './ModelInput.module.css';
import Input from '../../../UI/Input/Input';
import React from 'react';


const ModelInput = (props) => {

    const carModels = {
        Mazda: ['None', '3'],
        Ford: ['None', 'Focus', 'Mustang'],
        Renault: ['None', 'Hatchback'],
        Seat: ['None', 'Ibiza', 'Leon'],
        None: ['None']
    };

    return (
        <div className={classes.ModelInput}>
            <label className={!props.producerValue ? classes.Disabled : null}>{props.title}</label>
            <div className={classes.Container}>
                <Input
                    type='select'
                    values={carModels[props.producerValue ? props.producerValue : 'None']}
                    name='model'
                    changeInput={props.changeInput}
                    value={props.modelValue}
                    disabled={!props.producerValue}
                />
            </div>
        </div>
    );
};

export default ModelInput;