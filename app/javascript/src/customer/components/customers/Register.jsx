import React from 'react';
import I18n from 'i18n-js';
import withCartMixins from '../../mixins/CartMixin';

class RegisterComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: []
    };
  }

  render() {
    return RegisterRT.apply(this);
  }

  submit = (e) => {
    e.preventDefault();
    var formData = $(this.refs.form).serialize();

    this.handleSubmit(formData);
  }

  handleSubmit = (formData) => {
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
}

const Register = withCartMixins(RegisterComponent);
export default Register;
