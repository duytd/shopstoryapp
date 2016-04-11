var FormErrors = React.createClass({
  render: function() {
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
})
