var Checkout = React.createClass({
  componentWillMount: function() {
    if (this.props.globalVars.current_customer)
      Turbolinks.visit(Routes.new_customer_order_path());
  },
  render: CheckoutRT
})

module.exports = Checkout;
