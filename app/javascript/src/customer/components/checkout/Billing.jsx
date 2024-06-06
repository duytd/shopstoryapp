import React from 'react';
import I18n from 'i18n-js';

export default class Billing extends React.Component {
  constructor() {
    super(props);

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

    this.state = {
      hasPaymentMethod: hasPaymentMethod,
      errors: {},
      useShippingAddress: true,
      currentPaymentMethod: currentPaymentMethod,
      handler: null
    };
  }

  render() {
    return BillingRT.apply(this);
  }

  componentDidMount() {
    var script = document.createElement("script");
    var head = document.getElementsByTagName('head')[0];
    var key = this.props.publishable_key;

    script.src = "https://checkout.stripe.com/checkout.js";
    head.appendChild(script);

    script.onload = function() {
      var handler = StripeCheckout.configure({
        key: key,
        locale: "auto",
        token: function(token) {
          $.post(Routes.customer_stripe_charges_path.localize(), {stripeEmail: token.email, stripeToken: token.id}, function(response) {
            window.location = response.url;
          })
          .fail(function(xhr) {
            alert(xhr.responseJSON.error);
          })
        }
      });

      this.setState({handler: handler});
    }.bind(this)
  }

  switchBilling = () => {
    var checkbox = $(this.refs.useShippingAddress);

    if (checkbox.is(":checked")) {
      this.setState({useShippingAddress: true});
    }
    else {
      this.setState({useShippingAddress: false});
    }
  }

  switchPaymentMethod =  (method) => {
    this.setState({currentPaymentMethod: method});
  }

  updateOrder = (order) => {
    this.props.updateOrder(order);

    if (order.payment.payment_method.type == "payment_methods/paypal") {
      $.get(Routes.customer_paypal_transaction_pay_path.localize(), function(response) {
        location.href = response.paypal_url;
      }).fail(function(xhr) {
        alert(xhr.statusText);
      })
    }
    else if (order.payment.payment_method.type == "payment_methods/stripe") {
      this.state.handler.open({
        email: order.billing_address.email,
        currency: order.currency,
        amount: order.total
      });
    }
    else {
      alert("Invalid payment method");
    }
  }
}
