import React from 'react';

import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCartOpened: false,
      itemCount: 0
    };
  }

  componentDidMount() {
    this.updateItemCount();
  }

  componentWillReceiveProps() {
    this.updateItemCount();
  }

  openCart = (e) => {
    e.preventDefault();

    this.setState({isCartOpened: true});
  }

  closeCart = (e) => {
    e.preventDefault();
    this.setState({isCartOpened: false});

    if (this.props.closeCart) {
      this.props.closeCart();
    }
  }

  updateItemCount = () => {
    var itemCount = 0;

    this.props.globalVars.order.cart.forEach(function(item) {
      itemCount += item.quantity;
    })

    this.setState({itemCount: itemCount});
  }

  render() {
    return HeaderRT.apply(this);
  }
}
