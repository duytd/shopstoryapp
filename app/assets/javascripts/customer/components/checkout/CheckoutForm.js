var CheckoutForm = React.createClass({
  mixins: [CartMixin],
  getInitialState: function() {
    return {
      order: this.props.order
    }
  },
  render: CheckoutFormRT,
  updateOrder: function(order) {
    this.setState({order: order})
  }
})

module.exports = CheckoutForm;