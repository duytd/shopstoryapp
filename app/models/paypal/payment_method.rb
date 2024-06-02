module Paypal
  class PaymentMethod < ::PaymentMethod
    def required_fields
      %w( mode username password password signature )
    end
  end
end
