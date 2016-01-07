require "inicis/standard/rails/paymethod/vbank"

class Customer::PagesController < Customer::BaseController
  before_action :authenticate_order!, only: :success

  def home
    @products = Product.latest
  end

  def checkout
  end

  def success
    transaction_info = nil

    if current_order.payment.extra_data
      extra_data = JSON.parse current_order.payment.extra_data
      vbank = Inicis::Standard::Rails::Paymethod::Vbank.new data: extra_data
      transaction_info = vbank.transaction_info
    end

    @order_info = {
      order_number: current_order.id,
      transaction_info: transaction_info,
      support_email: current_shop.email
    }

    cookies.delete :cart

    @props = {
      globalVars: @globalVars,
      order_info: @order_info
    }
  end

  private
  def authenticate_order!
    unless current_order.payment
      redirect_to customer_root_path
    end
  end
end
