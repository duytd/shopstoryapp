class Merchant::CustomersController < Merchant::BaseController
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
      url: merchant_customers_path,
      method: :post
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
      customer: @customer,
      order: @customer.orders,
      url: merchant_customer_path(@customer),
      method: :put
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
    @customers = Customer.all.includes :orders

    @props = {
      customers: @customers,
      orders: @customers.orders.successful,
      total_spent: @customer.orders.successful.inject(0){|sum, item| sum + item.total}
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
