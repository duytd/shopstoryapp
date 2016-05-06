module PaymentHelper
  def get_transaction_info order
    payment_method = order.payment_method

    if payment_method.is_a? InicisPayment
      extra_data = JSON.parse order.payment.extra_data.to_s

      inicis = case order.payment.submethod
        when "vbank"
          Inicis::Standard::Rails::Paymethod::Vbank.new data: extra_data
        when "directbank"
          Inicis::Standard::Rails::Paymethod::DirectBank.new data: extra_data
        when "card"
          Inicis::Standard::Rails::Paymethod::Card.new data: extra_data
        end

      transaction_info = inicis.transaction_info
    elsif payment_method.is_a? PaypalShopstory::PaymentMethod
      if order.payment.extra_data
        paypal = PaypalShopstory::Paypal.new data: order.payment.extra_data
        transaction_info = paypal.transaction_info
      end
    elsif payment_method.is_a? KakaoShopstory::PaymentMethod
      if order.payment.extra_data
        kakaopay = KakaoShopstory::Kakaopay.new data: order.payment.extra_data
        transaction_info = kakaopay.transaction_info
      end
    elsif payment_method.is_a? StripeShopstory::PaymentMethod
      if order.payment.extra_data
        stripe = StripeShopstory::Stripe.new data: order.payment.extra_data
        transaction_info = stripe.transaction_info
      end
    end

    return transaction_info
  end
end
