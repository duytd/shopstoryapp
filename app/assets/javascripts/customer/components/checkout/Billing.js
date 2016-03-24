var Billing = React.createClass({
  getInitialState: function() {
    var currentPaymentMethod = (this.props.order.payment && this.props.order.payment.payment_method) ?
      this.props.order.payment.payment_method :
      this.props.payment_method_shops[0].payment_method;

    return {
      order: this.props.order,
      errors: {},
      useShippingAddress: true,
      currentPaymentMethod: currentPaymentMethod
    }
  },
  render: BillingRT,
  switchBilling: function() {
    var checkbox = $(this.refs.useShippingAddress);

    if (checkbox.is(":checked"))
      this.setState({useShippingAddress: true});
    else
      this.setState({useShippingAddress: false});
  },
  switchPaymentMethod: function(method) {
    this.setState({currentPaymentMethod: method});
  },
  updateOrder: function(order) {
    this.setState({order: order}, function() {
      if (this.state.order.payment.payment_method.type == "InicisPayment") {
        if (this.props.mobile) {
          alert(1)
          $.get(Routes.customer_inicis_transaction_pay_path({locale: I18n.locale}), function(data) {
            $('#inicisPayment').html(data);
          })
        }
        else {
          $.get(Routes.customer_inicis_mobile_transaction_pay_path({locale: I18n.locale}), function(data) {
            $('#inicisPayment').html(data);
          })
        }
      }
      else if (this.state.order.payment.payment_method.type == "PaypalShopstory::PaymentMethod") {
        $.get(Routes.customer_paypal_transaction_pay_path(), function(response) {
          location.href = response.paypal_url
        })
      }
      else {
        location.href = Routes.customer_order_payment_path(order.id, {locale: I18n.locale});
      }
    })
  }
})

module.exports = Billing;
