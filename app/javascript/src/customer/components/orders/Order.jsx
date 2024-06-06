import React from 'react';
import I18n from 'i18n-js';
import withCartMixins from '../../mixins/CartMixin';

class OrderComponent extends React.Component {
  render() {
    return OrderRT.apply(this);
  }
}

const Order = withCartMixins(OrderComponent);
export default Order;
