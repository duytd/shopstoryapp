var Errors = React.createClass({
  render: function() {
    var errors = this.props.errors.map(function(error) {
      return <p>{error}</p>;
    });

    return (
      <div className="alert-danger small">
        {errors}
      </div>
    );
  }
});
