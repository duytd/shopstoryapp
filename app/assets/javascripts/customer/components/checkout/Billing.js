var Billing = React.createClass({
  getInitialState: function() {
    var currentPaymentMethod = null,
      hasPaymentMethod = true;

    if (this.props.payment_method_shops.length == 0) {
      hasPaymentMethod = false;
    }

    if (hasPaymentMethod) {
      if (this.props.order.payment && this.props.order.payment.payment_method) {
        currentPaymentMethod = this.props.order.payment.payment_method;
      }
      else {
        currentPaymentMethod = this.props.payment_method_shops[0].payment_method;
      }
    }

    return {
      hasPaymentMethod: hasPaymentMethod,
      errors: {},
      useShippingAddress: true,
      currentPaymentMethod: currentPaymentMethod
    }
  },
  render: BillingRT,
  switchBilling: function() {
    var checkbox = $(this.refs.useShippingAddress);

    if (checkbox.is(":checked")) {
      this.setState({useShippingAddress: true});
    }
    else {
      this.setState({useShippingAddress: false});
    }
  },
  switchPaymentMethod: function(method) {
    this.setState({currentPaymentMethod: method});
  },
  updateOrder: function(order) {
    this.props.updateOrder(order);

    if (order.payment.payment_method.type == "inicis_payment") {
      if (this.props.mobile) {
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
    else if (order.payment.payment_method.type == "paypal_shopstory/payment_method") {
      $.get(Routes.customer_paypal_transaction_pay_path(), function(response) {
        location.href = response.paypal_url;
      })
    }
    else {
      location.href = Routes.customer_order_payment_path(order.id, {locale: I18n.locale});
    }
  }
})

module.exports = Billing;
