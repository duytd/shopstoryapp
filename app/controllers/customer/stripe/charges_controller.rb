class Customer::Stripe::ChargesController < ApplicationController
  def create
  end

  private

  def stripe_client
    Stripe::StripeClient.new(
      email: stripe_params[:stripe_email],
      token:stripe_params[:stripe_email],
    )
  end

  def stripe_params
    params.permit(:stripe_email, :stripe_token)
  end
end
