import React from 'react';


export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      globalVars: this.props.globalVars,
      errors: []
    };
  }

  render() {
    return RegisterRT.apply(this);
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
