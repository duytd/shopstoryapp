var PaymentMethodList = React.createClass({
  render: function(){
    var paymentMethodNodes = this.props.payment_method_shops.map(function (method_shop) {
      return <PaymentMethod payment_method_shop={method_shop} key={"method_shop_" + method_shop.id} />
    }.bind(this));

    return (
      <div className="payment-method-list">
        {paymentMethodNodes}
      </div>
    );
  }
})
