import React from 'react';

export default class FormErrors extends React.Component {
  render() {
    var errors = null;

    if (this.props.errors) {
      errors = this.props.errors.map(function(error) {
        return error;
      })
    }

    return (
      <div className="form-errors">
        {errors}
      </div>
    );
  }
}
