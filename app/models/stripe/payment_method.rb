module Stripe
  class PaymentMethod < ::PaymentMethod
    def required_fields
      %w( secret_key publishable_key )
    end
  end
end
