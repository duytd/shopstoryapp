class Customer::CustomersController < Customer::BaseController
  before_action :authenticate_customer!

  def show
    @props = {
      customer: current_customer,
      orders: current_customer.product_orders,
      bookings: current_customer.bookings
    }
  end
end
