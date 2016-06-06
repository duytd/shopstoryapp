class PaymentMethodService
  def initialize params
    @shop = params[:shop]
  end

  def create_initial_data
    PaymentMethod.all.each do |method|
      payment_method_shop = @shop.payment_method_shops.find_or_create_by payment_method_id: method.id

      options = []
      method.payment_method_options.each do |option|
        options << payment_method_shop.payment_method_option_shops.build(
          payment_method_option_id: option.id,
          value: option.default_value
        )
      end

      PaymentMethodOptionShop.import options
    end
  end
end
