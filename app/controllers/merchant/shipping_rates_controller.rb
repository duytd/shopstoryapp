class Merchant::ShippingRatesController < Merchant::BaseController
  load_and_authorize_resource

  def index
   if request.delete?
      delete_all
    else
      list_all
    end
  end

  def new
    @props = {
      types: ShippingRate.types,
      url: merchant_shipping_rates_path,
      redirect_url: merchant_shipping_rates_path,
      method: :post
    }
  end

  def create
    begin
      @shipping_rate =  ShippingRate.type_class params[:type]
      @shipping_rate.attributes = shipping_rate_params

      if @shipping_rate.save
        render json: present(@shipping_rate, {presenter_klass: "Merchant::#{@shipping_rate.class.superclass.name}Presenter".constantize}), status: :ok
      else
        render json: @shipping_rate.errors, status: :unprocessable_entity
      end
    rescue KeyError
      render json: nil, status: :bad_request
    end
  end

  def edit
    @props = {
      shipping_rate: present(@shipping_rate, {presenter_klass: "Merchant::#{@shipping_rate.class.superclass.name}Presenter".constantize}),
      url: merchant_shipping_rate_path(@shipping_rate),
      redirect_url: merchant_shipping_rates_path,
      method: :put
    }
  end

  def update
    if @shipping_rate.update shipping_rate_params
      render json: present(@shipping_rate, {presenter_klass: "Merchant::#{@shipping_rate.class.superclass.name}Presenter".constantize}), status: :ok
    else
      render json: @shipping_rate.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @shipping_rate.destroy
    render json: nil, status: :ok
  end

  private
  def list_all
    @props = {
      shipping_rates: ShippingRate.all.map{|r| present(r, {presenter_klass: "Merchant::#{r.class.superclass.name}Presenter".constantize})}
    }
  end

  def delete_all
    ShippingRate.where(id: params[:shipping_rate_ids]).destroy_all
    render json: nil, status: :ok
  end

  def shipping_rate_params
    permitted = ShippingRate.globalize_attribute_names + [:rate, :min_price, :active]
    params.require(:shipping_rate).permit permitted
  end
end
