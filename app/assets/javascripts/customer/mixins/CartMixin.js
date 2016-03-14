var CartMixin = {
  getInitialState: function () {
    return {
      globalVars: this.props.globalVars
    };
  },
  updateCart: function(cartData) {
    var globalVars = this.state.globalVars;

    globalVars.cart = cartData;
    this.setState({globalVars: globalVars});
  }
}

module.exports = CartMixin;
