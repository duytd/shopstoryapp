import React from 'react';
import I18n from 'i18n-js';


export default class ShippingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      country: "KR"
    };
  }

  render() {
    return ShippingFormRT.apply(this);
  }

  streetClick = () => {
    if (this.state.country == "KR") {
      openDaumPostcode(function(data) {
        var address = data.address,
          zipcode = data.zonecode;

        this.setAddress(address, zipcode);
      }.bind(this));
    }
  }

  updateCountry = (e) => {
    this.setState({country: e.target.value});
  }

  setAddress = (address, zipcode) => {
    const addressValue = typeof address !== "undefined" ? address : "";
    const zipcodeValue = typeof zipcode !== "undefined" ? zipcode : "";

    this.refs.address.value = addressValue;
    this.refs.zipcode.value = zipcodeValue;
  }

  updateOrder = (e) => {
    e.preventDefault();

    var formData = $(this.refs.form).serialize();

    $.ajax({
      data: formData,
      method: "PUT",
      url: Routes.customer_order_path(this.props.order.id, {locale: I18n.locale}),
      success: function(order) {
        this.setState({errors: []});
        this.props.updateOrder(order);

        if (this.props.disableEditing)
          this.props.disableEditing();
      }.bind(this),
      error: function(xhr) {
        this.setState({errors: xhr.responseJSON});
      }.bind(this)
    })
  }
}
