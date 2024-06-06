import React from 'react';
import I18n from 'i18n-js';
import withCartMixins from '../../mixins/CartMixin';

class ForgotPasswordComponent extends React.Component {
  constructor() {
    super(props);

    this.state = {
      error: ""
    };
  }

  render() {
    return ForgotPasswordRT.apply(this);
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

const ForgotPassword = withCartMixins(ForgotPasswordComponent);
export default ForgotPassword;
