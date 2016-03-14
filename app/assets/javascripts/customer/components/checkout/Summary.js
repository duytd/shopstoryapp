var Summary = React.createClass({
  getInitialState: function() {
    return {
      subtotal: 0
    }
  },
  render: SummaryRT,
  componentDidMount: function() {
    this.updateSubtotal();
  },
  componentWillReceiveProps: function() {
    this.updateSubtotal();
  },
  updateSubtotal: function() {
    var subtotal = 0;

    this.props.globalVars.cart.forEach(function(item, index) {
      subtotal += parseInt(item.unit_price) * item.quantity;
    })

    this.setState({subtotal: subtotal});
  }
})

module.exports = Summary;
