class Customer::CustomersController < Customer::BaseController
  authorize_resource
  before_action :authenticate_customer!

  def show
    load_global_variables

    @props = {
      globalVars: @globalVars,
      orders: current_customer.orders.success.map{|p| present(p)},
    }
  end
end
