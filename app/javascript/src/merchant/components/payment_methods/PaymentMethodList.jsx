import React from 'react';
import PaymentMethod from './PaymentMethod';

export default class PaymentMethodList extends React.Component {
  render() {
    var paymentMethodNodes = this.props.payment_methods.map(function (method) {
      return <PaymentMethod payment_method={method} key={"method_shop_" + method.id} />
    }.bind(this));

    return (
      <div className="payment-method-list">
        {paymentMethodNodes}
      </div>
    );
  }
}
