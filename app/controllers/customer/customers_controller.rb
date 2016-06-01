class Customer::CustomersController < Customer::BaseController
  authorize_resource
  before_action :authenticate_customer!

  def show
    @props = {
      globalVars: @globalVars,
      orders: current_customer.product_orders.having_payment.map{|p| present(p)},
      bookings: current_customer.bookings.having_payment
    }
  end
end
