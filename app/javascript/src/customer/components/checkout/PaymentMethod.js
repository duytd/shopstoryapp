var PaymentMethod = React.createClass({
  render: PaymentMethodRT,
  switchPaymentMethod: function(method, e) {
    this.props.switchPaymentMethod(method);
  }
})

module.exports = PaymentMethod;
