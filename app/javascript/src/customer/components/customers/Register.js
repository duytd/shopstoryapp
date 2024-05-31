var Register = React.createClass({
  mixins: [CartMixin],
  getInitialState: function() {
    return {
      errors: []
    }
  },
  render: RegisterRT,
  submit: function(e) {
    e.preventDefault();
    var formData = $(this.refs.form).serialize();

    this.handleSubmit(formData);
  },
  handleSubmit: function(formData) {
    $.ajax({
      data: formData,
      url: Routes.customer_registration_path.localize(),
      method: "post",
      dataType: "json",
      success: function(data) {
        window.location = data.redirect_url;
      },
      error: function(xhr) {
        this.setState({
          errors: xhr.responseJSON.errors
        });
      }.bind(this)
    });
  }
})

module.exports = Register;
