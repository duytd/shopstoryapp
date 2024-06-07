import React from 'react';

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      globalVars: this.props.globalVars
    };
  }

  componentWillMount() {
    if (this.props.globalVars.current_customer) {
      window.location = Routes.new_customer_product_order_path.localize();
    }
  }

  render() {
    return CheckoutRT.apply(this);
  }

  updateOrder = (order) => {
    var globalVars = this.state.globalVars;

    globalVars.order = order;
    this.setState({globalVars: globalVars});
  }
}
