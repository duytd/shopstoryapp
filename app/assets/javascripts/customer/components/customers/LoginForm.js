var LoginForm = React.createClass({
  getInitialState: function() {
    return {
      error: ""
    }
  },
  render: LoginFormRT,
  submit: function(e) {
    e.preventDefault();
    var formData = $(this.refs.form).serialize();

    this.handleSubmit(formData);
  },
  handleSubmit: function(formData) {
    var url = Routes.customer_session_path();

    if (this.props.redirect_url) {
      if (url.indexOf("?") != -1)
        url += "&redirect_url=" + encodeURIComponent(this.props.redirect_url);
      else
        url += "?redirect_url=" + encodeURIComponent(this.props.redirect_url);
    }

    $.ajax({
      data: formData,
      url: url,
      method: "post",
      dataType: "json",
      success: function(data) {
        Turbolinks.visit(data.redirect_url);
      },
      error: function(xhr) {
        this.setState({
          error: xhr.responseJSON.error
        });
      }.bind(this)
    });
  }
});

module.exports = LoginForm;
