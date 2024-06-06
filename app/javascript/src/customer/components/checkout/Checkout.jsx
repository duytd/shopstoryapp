import React from 'react';
import I18n from 'i18n-js';
import withCartMixins from '../../mixins/CartMixin';

class CheckoutComponent extends React.Component {
  componentWillMount() {
    if (this.props.globalVars.current_customer)
      window.location = Routes.new_customer_product_order_path.localize();
  }

  render() {
    return CheckoutRT.apply(this);
  }
}

const Checkout = withCartMixins(CheckoutComponent);
export default Checkout;
