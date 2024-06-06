import React from 'react';
import I18n from 'i18n-js';
import withCartMixins from '../../mixins/CartMixin';

class LoginComponent extends React.Component {
  render() {
    return LoginRT.apply(this);
  }
}

const Login = withCartMixins(LoginComponent);
export default Login;
