import React from 'react';
import {formValues,Field, reduxForm } from 'redux-form';
const GameForm = props => {
    const { error, handleSubmit } = props;
    const digit = (value ,previousValue ,allValues ,previousAllValues) => 
    { 
        let prev = [previousAllValues.d1, previousAllValues.d2,previousAllValues.d3,previousAllValues.d4];
        let curr = [previousAllValues.d1, previousAllValues.d2,previousAllValues.d3,previousAllValues.d4];
        for (let i=0;i<curr.length;i++)
        {
            for (let j=0;j<prev.length;j++)    
            {
                if (i!=j && curr[i] && prev[j] && curr[i] == prev[j])
                {
                    return "";
                }
            }
        }
        return "123456789".includes(value)?value:""
    };
    function onChange(event, newValue, previousValue, name)
    {
        
    }
    return (
        <div className="mb-3">
            <h4>Player: {props.playerName}</h4>
            <h4>Original</h4>
            <h4>{props.secret.map(x=>x)}</h4>
            <h4>enter number</h4>
            <form onSubmit={handleSubmit} className="form-horizontal">
                {error && <div className="mt-10 px-0 col-sm-6 alert alert-danger">{error}</div>}
                <div className="form-row w-100">
                    <span className="col-md-1 mr-1">
                        <Field
                            name="d1"
                            component="input"
                            type="text"
                            maxLength="1"
                            className="form-control form-control-sm"
                            normalize={digit}
                            onChange={onChange}
                        />
                    </span>
                    <span className="col-md-1 mr-1">
                        <Field
                            name="d2"
                            component="input"
                            type="text"
                            maxLength="1"
                            className="form-control form-control-sm"
                            normalize={digit}
                        />
                    </span>
                    <span className="col-md-1 mr-1">
                        <Field
                            name="d3"
                            component="input"
                            type="text"
                            maxLength="1"
                            className="form-control form-control-sm"
                            normalize={digit}
                        />
                    </span>
                    <span className="col-md-1 mr-1">
                        <Field
                            name="d4"
                            component="input"
                            type="text"
                            maxLength="1"
                            pattern="[1-9]{1}"
                            className="form-control form-control-sm"
                            normalize={digit}
                        />
                    </span>
                </div>
            </form>
        </div>
    );
};

export default reduxForm({
    form: 'gameForm', // a unique identifier for this form
})(GameForm);
