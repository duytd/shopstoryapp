class Merchant::PaymentMethodShopsController < Merchant::BaseController
  load_and_authorize_resource

  def index
    @payment_method_shops = current_shop.payment_method_shops
  end

  def update
    if @payment_method_shop.update payment_method_shop_params
      render json: @payment_method_shop, status: :ok
    else
      render json: @payment_method_shop.errors.full_messages, status: :unprocessable_entity
    end
  end

  def payment_method_shop_params
    permitted_payment_method_option_shops_attributes =  [:id, :value]

    params.require(:payment_method_shop).permit :key, :active, payment_method_option_shops_attributes: permitted_payment_method_option_shops_attributes
  end
end
