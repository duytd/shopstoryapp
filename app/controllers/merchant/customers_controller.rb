class Merchant::CustomersController < Merchant::BaseController
  before_action :load_customer, only: [:edit, :update]
  load_and_authorize_resource
  include Merchant::ShopsHelper

  def index
   if request.delete?
      delete_all
    else
      list_all
    end
  end

  def new
    @props = {
      url: merchant_customers_path,
      method: :post,
      genders: Customer.genders.keys.to_a,
      countries: all_countries,
      default_country: Settings.shop.default_country,
    }
  end

  def create
    @customer = Customer.new customer_params

    if @customer.save
      render json: Merchant::CustomerPresenter.new(@customer), status: :ok
    else
      render json: @customer.errors, status: :unprocessable_entity
    end
  end

  def edit
    @props = {
      customer: Merchant::CustomerPresenter.new(@customer),
      orders: @customer.product_orders.success,
      url: merchant_customer_path(@customer),
      method: :put,
      genders: Customer.genders.keys.to_a,
      countries: all_countries,
      default_country: Settings.shop.default_country
    }
  end

  def update
    if @customer.update customer_params
      render json: Merchant::CustomerPresenter.new(@customer), status: :ok
    else
      render json: @customer.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @customer.destroy
    render json: nil, status: :ok
  end

  def export
    if params[:all]
      @customers = Customer.order email: :asc
    else
      @customers = Customer.where(id: params[:customer_ids]).order email: :asc
    end

    send_data @customers.to_csv
  end

  private
  def load_customer
    @customer = Customer.includes(:product_orders).find params[:id]
  end

  def list_all
    @customers = Customer.includes(:product_orders).page params[:page]

    @props = paginating @customers, {
      customers: @customers.map{|c| Merchant::CustomerPresenter.new(c)},
      url: merchant_customers_path
    }
  end

  def delete_all
    Customer.where(id: params[:customer_ids]).destroy_all
    render json: nil, status: :ok
  end

  def customer_params
    params.require(:customer).permit :first_name, :last_name, :gender, :phone, :city, :country, :zip_code, :address, :email
  end
end
