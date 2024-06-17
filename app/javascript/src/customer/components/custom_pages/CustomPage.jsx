import React from 'react';
import withCartMixins from '../../mixins/CartMixin';

class CustomPageComponent extends React.Component {
  render() {
    return CustomPageRT.apply(this);
  }
}

const CustomPage = withCartMixins(CustomPageComponent);
export default CustomPage;
