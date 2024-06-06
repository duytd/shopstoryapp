import React from 'react';
import I18n from 'i18n-js';
import withCartMixins from '../../mixins/CartMixin';

class CustomPageComponent extends React.Component {
  render() {
    return CustomPageRT.apply(this);
  }
}

const CustomPage = withCartMixins(CustomPageComponent);
export default CustomPage;
