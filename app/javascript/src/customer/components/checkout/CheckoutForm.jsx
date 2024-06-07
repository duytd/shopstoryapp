import React from 'react';
import I18n from 'i18n-js';
import withCartMixins from '../../mixins/CartMixin';

class CheckoutFormComponent extends React.Component {
  render() {
    return CheckoutForm.apply(this);
  }
}

const CheckoutForm = withCartMixins(CheckoutFormComponent);
export default CheckoutForm;
