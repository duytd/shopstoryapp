var PaymentMethodBox = React.createClass({
  render: function() {
    return (
      <div className="payment-methods">
        <PaymentMethodList payment_method_shops={this.props.payment_method_shops} />
      </div>
    );
  }
});
