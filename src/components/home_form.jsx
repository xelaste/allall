import React from 'react';
import { Field, reduxForm,clearSubmitErrors} from 'redux-form';
const HomeForm = props => {
  const {error,handleSubmit} = props;
  return (
    <form onSubmit={handleSubmit} className="form-horizontal">
      {error && <div className="mt-10 px-2 col-sm-6 alert alert-danger">{error}</div>}
      <div className="form-group">
        <label className="control-label"><h4>New Player Name:</h4></label>
        <span className="col-sm-2">
          <Field
            name="playerName"
            component="input"
            type="text"
          />
        </span>
      </div>
    </form>
  );
};
export default reduxForm({
  form: 'homeForm',
  onChange: (values, dispatch, props) => {
    if (props.error) dispatch(clearSubmitErrors('homeForm'));
  } // a unique identifier for this form
})(HomeForm);
