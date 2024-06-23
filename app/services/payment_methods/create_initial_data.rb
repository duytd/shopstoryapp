class PaymentMethods::CreateInitialData < ApplicationInteraction
  def execute
    paypal_payment_method = PaymentMethods::Paypal.find_or_create_by(name: "Paypal")

    paypal_payment_method.payment_method_options.create([
      {
        name: "mode",
        title: "Mode",
        default_value: "",
        option_type: "text"
      },
      {
        name: "username",
        title: "Username",
        default_value: "",
        option_type: "text"
      },
      {
        name: "password",
        title: "Password",
        default_value: "",
        option_type: "text"
      },
      {
        name: "signature",
        title: "Signature",
        default_value: "",
        option_type: "text"
      }
    ])

    stripe_payment_method = PaymentMethods::Stripe.find_or_create_by(name: "Stripe")

    stripe_payment_method.payment_method_options.create([
      {
        name: "secret_key",
        title: "Secret key",
        default_value: "",
        option_type: "text"
      },
      {
        name: "publishable_key",
        title: "Publishable key",
        default_value: "",
        option_type: "text"
      }
    ])
  end
end
