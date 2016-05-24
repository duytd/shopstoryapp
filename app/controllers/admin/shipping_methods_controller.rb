class Admin::ShippingMethodsController < Admin::BaseController
  before_action :load_shipping_method, only: [:edit, :update, :destroy]

  def index
    @shipping_methods = ShippingMethod.all
  end

  def new
    @shipping_method = ShippingMethod.new
  end

  def create
    @shipping_method = ShippingMethod.new shipping_method_params

    if @shipping_method.save
      redirect_to admin_shipping_methods_path
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @shipping_method.update shipping_method_params
      redirect_to admin_shipping_methods_path
    else
      render :new
    end
  end

  def destroy
    @shipping_method.destroy
    redirect_to admin_shipping_methods_path
  end

  private
  def load_shipping_method
    @shipping_method = ShippingMethod.find params[:id]
  end

  def shipping_method_params
    params.require(:shipping_method).permit *ShippingMethod.globalize_attribute_names + [:tracking_url]
  end
end
