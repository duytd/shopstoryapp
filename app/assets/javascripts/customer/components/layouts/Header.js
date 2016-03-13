var Header = React.createClass({
  getInitialState: function() {
    return {
      isCartOpened: false,
      itemCount: 0
    }
  },
  componentDidMount: function() {
    this.updateItemCount();
  },
  componentWillReceiveProps: function() {
    this.updateItemCount();
  },
  render: HeaderRT,
  openCart: function(e) {
    e.preventDefault();

    this.setState({isCartOpened: true});
  },
  closeCart: function(e) {
    e.preventDefault();
    this.setState({isCartOpened: false});

    if (this.props.closeCart) {
      this.props.closeCart();
    }
  },
  updateItemCount: function() {
    var itemCount = 0;

    this.props.globalVars.cart.forEach(function(item) {
      itemCount += item.quantity;
    });

    this.setState({itemCount: itemCount});
  }
});

module.exports = Header;
