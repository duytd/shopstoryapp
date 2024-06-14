module Payments
  class StripeClient
    attr_reader :secret_key, :email, :token, :amount, :description, :currency

    def initialize options = {}
      @secret_key = options[:secret_key]
      @email = options[:email]
      @token = options[:token]
      @amount = options[:amount]
      @description = options[:description]
      @currency = options[:currency]
    end

    def pay!
      customer = ::Stripe::Customer.create(
        {
          email: email,
          source: token,
        },
        {
          api_key: secret_key
        }
      )

      charge = ::Stripe::Charge.create(
        {
          customer: customer.id,
          amount: amount,
          description: description,
          currency: currency
        },
        {
          api_key: secret_key
        }
      )

      {
        transaction_number: charge["balance_transaction"],
        extra_data: charge
      }
    end
  end
end
