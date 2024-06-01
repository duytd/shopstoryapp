import React from 'react';
import PaymentMethodList from './PaymentMethodList';

export default class PaymentMethodBox extends React.Component {
  render() {
    return (
      <div className="payment-methods">
        <PaymentMethodList payment_method_shops={this.props.payment_method_shops} />
      </div>
    )
  }
}
