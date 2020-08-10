import classes from './ModelInput.module.css';
import Input from '../../../UI/Input/Input';
import React from 'react';


const ModelInput = (props) => {

    const carModels = {
        Mazda: ['None', '2', '3', '6', 'CX5'],
        Ford: ['None', 'Focus', 'Mustang'],
        Renault: ['None', 'Hatchback'],
        Seat: ['None', 'Ibiza', 'Leon'],
        None: ['None']
    };

    return (
        <div className={classes.ModelInput}>
            <label
                className={!props.modelNameValue || props.modelNameValue === 'None' ? classes.Disabled : null}
            >
                {props.title}
            </label>
            <div className={classes.Container}>
                <Input
                    type='select'
                    values={props.modelNameValue ? carModels[props.modelNameValue] : carModels.None}
                    name='modelType'
                    changeInput={props.changeInput}
                    value={props.modelTypeValue}
                    disabled={!props.modelNameValue || props.modelNameValue === 'None'}
                />
            </div>
        </div>
    );
};

export default ModelInput;