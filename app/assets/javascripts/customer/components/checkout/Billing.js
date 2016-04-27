var Billing = React.createClass({
  componentDidMount: function() {
    var script = document.createElement("script");
    var head = document.getElementsByTagName('head')[0];
    var key = this.props.publishable_key;
    console.log(key)

    script.src = "https://checkout.stripe.com/checkout.js";
    head.appendChild(script);

    script.onload = function() {
      var handler = StripeCheckout.configure({
        key: key,
        locale: "auto",
        token: function(token) {
          $.post(Routes.customer_stripe_charges_path(), {stripeEmail: token.email, stripeToken: token.id}, function() {

          })
          .fail(function(xhr) {
            alert(xhr.responseJSON.error);
          })
        }
      });

      this.setState({handler: handler});
    }.bind(this)
  },
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
      currentPaymentMethod: currentPaymentMethod,
      handler: null
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
      }).fail(function(xhr) {
        alert(xhr.statusText);
      })
    }
    else if (order.payment.payment_method.type == "stripe_shopstory/payment_method") {
      this.state.handler.open({
        email: order.billing_address.email,
        currency: order.currency,
        amount: order.total
      });
    }
    else {
      location.href = Routes.customer_order_payment_path(order.id, {locale: I18n.locale});
    }
  }
})

module.exports = Billing;
