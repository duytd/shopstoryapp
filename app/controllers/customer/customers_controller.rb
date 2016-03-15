class Customer::CustomersController < Customer::BaseController
  authorize_resource
  before_action :authenticate_customer!

  def show
    @props = {
      globalVars: @globalVars,
      customer: current_customer,
      orders: current_customer.product_orders.having_payment,
      bookings: current_customer.bookings.having_payment
    }
  end
end
