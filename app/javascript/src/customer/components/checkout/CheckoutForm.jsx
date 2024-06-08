import React from 'react';
import withCartMixins from '../../mixins/CartMixin';

class CheckoutFormComponent extends React.Component {
  render() {
    return CheckoutFormRT.apply(this);
  }
}

const CheckoutForm = withCartMixins(CheckoutFormComponent);
export default CheckoutForm;
