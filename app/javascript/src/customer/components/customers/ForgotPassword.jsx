import React from 'react';

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      globalVars: this.props.globalVars,
      error: ""
    };
  }

  render() {
    return ForgotPasswordRT.apply(this);
  }

  updateOrder = (order) => {
    var globalVars = this.state.globalVars;

    globalVars.order = order;
    this.setState({globalVars: globalVars});
  }

  submit = (e) => {
    e.preventDefault();
    var formData = $(this.refs.form).serialize();

    this.handleSubmit(formData);
  }

  handleSubmit = (formData) => {
    var url = Routes.customer_password_path.localize();

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
        window.location = data.redirect_url;
      },
      error: function(xhr) {
        this.setState({
          error: xhr.responseJSON.error
        });
      }.bind(this)
    });
  }
}
