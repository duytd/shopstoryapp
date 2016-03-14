class Customer::CustomersController < Customer::BaseController
  before_action :authenticate_customer!

  def show
    @props = {
      globalVars: @globalVars,
      customer: current_customer,
      orders: current_customer.product_orders.processed,
      bookings: current_customer.bookings.processed
    }
  end
end
