class PaymentMethodService
  def initialize params
    @shop = params[:shop]
  end

  def create_initial_data
    PaymentMethod.all.each do |method|
      payment_method_shop = @shop.payment_method_shops.create! payment_method_id: method.id

      method.payment_method_options.each do |option|
        payment_method_shop.payment_method_option_shops.create!(
          payment_method_option_id: option.id,
          value: option.default_value
        )
      end
    end
  end
end
