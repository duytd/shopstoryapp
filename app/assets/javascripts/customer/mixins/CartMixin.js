var CartMixin = {
  getInitialState: function () {
    return {
      globalVars: this.props.globalVars
    };
  },
  updateOrder: function(order) {
    var globalVars = this.state.globalVars;

    globalVars.order = order;
    this.setState({globalVars: globalVars});
  }
}

module.exports = CartMixin;
