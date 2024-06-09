class Merchant::PaymentMethodsController < Merchant::BaseController
  load_and_authorize_resource

  def index
    @payment_methods = PaymentMethod.all
    @props = {
      payment_methods: @payment_methods
    }
  end

  def update
    if @payment_method.update payment_method_params
      render json: @payment_method, status: :ok
    else
      render json: @payment_method.errors.full_messages, status: :unprocessable_entity
    end
  end

  def payment_method_params
    permitted_payment_method_option_attributes = [:id, :value]

    params.require(:payment_method).permit :active, payment_method_options_attributes: permitted_payment_method_option_attributes
  end
end
