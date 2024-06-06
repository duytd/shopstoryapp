import React from 'react';
import I18n from 'i18n-js';

export default class PaymentMethod extends React.Component {
  render() {
    return PaymentMethodRT.apply(this);
  }

  switchPaymentMethod = (method, e) => {
    this.props.switchPaymentMethod(method);
  }
}
