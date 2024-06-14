class Customer::Stripe::ChargesController < Customer::BaseController
  def create
    stripe_response = stripe_client.pay!
    current_order.payment.save_transaction extra_data: stripe_response[:extra_data], transaction_number: stripe_response[:transaction_number]
    current_order.payment.paid!
    current_order.processed!
    clear_order
    empty_cart

    render json: {url: main_app.customer_success_path}
  end

  private

  def stripe_client
    options = {
      email: stripe_params[:stripe_email],
      token: stripe_params[:stripe_token],
      amount: current_order.total.to_i,
      description: "Charge for order ##{current_order.id}",
      currency: current_shop.currency,
      secret_key: PaymentMethod.stripe.load_option("secret_key")
    }

    Payments::StripeClient.new(options)
  end

  def stripe_params
    params.permit(:stripe_email, :stripe_token)
  end
end
