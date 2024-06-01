import React from 'react';

export default class PaymentMethodList extends React.Component {
  render() {
    var paymentMethodNodes = this.props.payment_method_shops.map(function (method_shop) {
      return <PaymentMethod payment_method_shop={method_shop} key={"method_shop_" + method_shop.id} />
    }.bind(this));

    return (
      <div className="payment-method-list">
        {paymentMethodNodes}
      </div>
    );
  }
}
