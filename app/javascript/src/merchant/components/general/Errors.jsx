export default class Errors extends React.Component {
  render() {
    var errors = this.props.errors.map(function(error) {
      return <p key={"error_" + Math.random()}>{error.capitalize()}</p>;
    })

    return (
      <div className="alert alert-danger small">
        {errors}
      </div>
    );
  }
}
