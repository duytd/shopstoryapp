var Register = React.createClass({
  getInitialState: function() {
    return {
      errors: []
    }
  },
  render: RegisterRT,
  submit: function(e) {
    e.preventDefault();
    var formData = $(this.refs.form.getDOMNode()).serialize();

    this.handleSubmit(formData, this.props.url);
  },
  handleSubmit: function(formData, action) {
    $.ajax({
      data: formData,
      url: action,
      method: "post",
      dataType: "json",
      success: function(data) {
        Turbolinks.visit(data.redirect_url);
      },
      error: function(xhr) {
        this.setState({
          errors: xhr.responseJSON.errors
        });
      }.bind(this)
    });
  }
});
