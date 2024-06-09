class Merchant::CustomersController < Merchant::BaseController
  before_action :load_customer, only: [:edit, :update]
  load_and_authorize_resource
  include CollectionsHelper

  add_breadcrumb I18n.t("merchant.breadcrumbs.dashboard"), :merchant_root_path, {only: [:index, :new, :edit]}
  add_breadcrumb I18n.t("merchant.breadcrumbs.customers"), :merchant_customers_path, {only: [:new, :edit]}

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
      default_country: Settings.shop.default_country
    }
  end

  def create
    @customer = Customer.new customer_params

    if @customer.save
      render json: present(@customer), status: :ok
    else
      render json: @customer.errors, status: :unprocessable_entity
    end
  end

  def edit
    @props = {
      customer: present(@customer),
      orders: @customer.orders.success,
      url: merchant_customer_path(@customer),
      method: :put,
      genders: Customer.genders.keys.to_a,
      countries: all_countries,
      default_country: Settings.shop.default_country
    }
  end

  def update
    if @customer.update customer_params
      render json: present(@customer), status: :ok
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
    @customer = Customer.find params[:id]
  end

  def list_all
    @customers = Customer.page params[:page]

    @props = paginating @customers, {
      customers: @customers.map{|c| present(c)},
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
