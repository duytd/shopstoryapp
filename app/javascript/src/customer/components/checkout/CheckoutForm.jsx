import React from 'react';
import I18n from 'i18n-js';
import withCartMixins from '../../mixins/CartMixin';

var CheckoutFormComponent = React.createClass({
  render() {
    return CheckoutForm.apply(this);
  }
})

const CheckoutForm = withCartMixins(CheckoutFormComponent);
export default CheckoutForm;
