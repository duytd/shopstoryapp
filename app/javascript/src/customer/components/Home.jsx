import React from 'react';
import I18n from 'i18n-js';

import Layout from '../components/layouts/Layout';
import Banner from '../components/snippets/Banner';
import ProductList from '../components/products/ProductList';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      globalVars: this.props.globalVars
    };
  }

  updateOrder(order) {
    var globalVars = this.state.globalVars;

    globalVars.order = order;
    this.setState({globalVars: globalVars});
  }

  render() {
    return HomeRT.apply(this);
  }
};
