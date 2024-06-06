import React from 'react';
import I18n from 'i18n-js';
import withCartMixins from '../../mixins/CartMixin';

class ResetPasswordComponent extends React.Component {
  render() {
    return ResetPasswordRT.apply(this);
  }
}

const ResetPassword = withCartMixins(ResetPasswordComponent);
export default ResetPassword;
