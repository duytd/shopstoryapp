import React from 'react';
import I18n from 'i18n-js';

export default class BillingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      country: "KR"
    };
  }

  render() {
    return BillingFormRT.apply(this);
  }

  updateCountry = (e) => {
    this.setState({country: e.target.value});
  }

  streetClick = () => {
    if (this.state.country == "KR") {
      openDaumPostcode(function(data) {
        var address = data.address,
          zipcode = data.zonecode;

        this.setAddress(address, zipcode);
      }.bind(this))
    }
  }

  setAddress = (address, zipcode) => {
    const address = typeof address !== "undefined" ? address : "";
    const zipcode = typeof zipcode !== "undefined" ? zipcode : "";

    this.refs.address.value = address;
    this.refs.zipcode.value = zipcode;
  }

  updateOrder = (e) => {
    e.preventDefault();
    var formData = $(this.refs.form).serialize();

    $.ajax({
      data: formData,
      method: "PUT",
      url: Routes.customer_product_order_path(this.props.order.id, {locale: I18n.locale}),
      beforeSend: function() {
        $(this.refs.loading).removeClass("hide");
      }.bind(this),
      success: function(order) {
        this.props.updateOrder(order);
      }.bind(this),
      error: function(xhr) {
        this.setState({errors: xhr.responseJSON});
      }.bind(this)
    })
  }
}
