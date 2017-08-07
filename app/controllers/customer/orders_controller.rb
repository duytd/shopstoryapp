require "rqrcode"

class Customer::OrdersController < Customer::BaseController
  authorize_resource

  def show
    load_order

    @props = {
      globalVars: @globalVars,
      order: present(@order),
    }
  end

  def load_order
    @order = ProductOrder.find(id: params[:id])
  end
end
