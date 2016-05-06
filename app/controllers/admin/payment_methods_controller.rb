class Admin::PaymentMethodsController < Admin::BaseController
  before_action :load_payment_method, only: [:edit, :update]

  def index
    @payment_methods = PaymentMethod.all
  end

  def edit
  end

  def update
    if @payment_method.update payment_method_params
      redirect_to admin_payment_methods_path
    else
      render :new
    end
  end

  private
  def load_payment_method
    @payment_method = PaymentMethod.find params[:id]
  end

  def payment_method_params
    params.require(:payment_method).permit :name, :description, :image
  end
end
