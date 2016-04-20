class Merchant::CustomersController < Merchant::BaseController
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
      render json: @customer, status: :ok
    else
      render json: @customer.errors, status: :unprocessable_entity
    end
  end

  def edit
    @props = {
      customer: @customer.as_json({methods: [:total_orders, :total_spent, :last_sign_in_at]}),
      orders: @customer.product_orders.successful,
      url: merchant_customer_path(@customer),
      method: :put,
      genders: Customer.genders.keys.to_a,
      countries: all_countries,
      default_country: Settings.shop.default_country
    }
  end

  def update
    if @customer.update customer_params
      render json: @customer, status: :ok
    else
      render json: @customer.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @customer.destroy
    render json: nil, status: :ok
  end

  private
  def list_all
    @customers = Customer.all.includes(:product_orders).page params[:page]

    @props = paginating @customers, {
      customers: @customers.as_json({methods: [:total_orders, :total_spent]}),
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
