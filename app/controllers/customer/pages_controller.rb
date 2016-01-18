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

    if @order.payment.extra_data
      extra_data = JSON.parse @order.payment.extra_data
      vbank = Inicis::Standard::Rails::Paymethod::Vbank.new data: extra_data
      transaction_info = vbank.transaction_info
    end

    @order_info = {
      order_number: @order.id,
      transaction_info: transaction_info,
      support_email: current_shop.email
    }

    @props = {
      globalVars: @globalVars,
      order_info: @order_info
    }
  end

  private
  def authenticate_order!
    case session[:order_type]
    when "ticket"
      order_token = cookies[:to]
      cookies.delete :to
    else
      order_token = cookies[:po]
      cookies.delete :po
    end

    @order = Order.find_by_token order_token
    @order.reset_confirmation_token if @order.is_a?(ShopstoryTicket::Booking)

    unless @order && @order.payment
      redirect_to customer_root_path
    end
  end
end
