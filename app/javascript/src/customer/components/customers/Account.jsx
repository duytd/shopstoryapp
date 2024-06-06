import React from 'react';
import I18n from 'i18n-js';
import withCartMixins from '../../mixins/CartMixin';

class AccountComponent extends React.Component {
  render() {
    return AccountRT.apply(this);
  }
}

const Account = withCartMixins(AccountComponent);
export default CustomPage;
