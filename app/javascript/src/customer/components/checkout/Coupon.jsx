import React from 'react';
import I18n from 'i18n-js';

export default class Coupon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: []
    };
  }

  render() {
    return CouponRT.apply(this);
  }

  submit = (e) => {
    e.preventDefault();

    var url = Routes.verify_coupon_customer_orders_path.localize();
    var code = this.refs.code.value;

    $.ajax({
      url: url,
      data: {
        code: code
      },
      method: "POST",
      success: function(order) {
        this.setState({errors: []}, this.props.updateOrder(order));
      }.bind(this),
      error: function(xhr) {
        this.setState({error: [xhr.responseJSON.message]})
      }.bind(this)
    })
  }

  remove = (e) => {
    e.preventDefault();
    var url = Routes.remove_coupon_customer_orders_path.localize();

    $.ajax({
      url: url,
      method: "DELETE",
      success: function(order) {
        this.setState({errors: []}, this.props.updateOrder(order));
      }.bind(this),
      error: function(xhr) {
        alert(xhr.responseText)
      }.bind(this)
    })
  }
}
