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
    payment_method = @order.payment_method

    if payment_method.is_a? InicisPayment
      if @order.payment.extra_data
        extra_data = JSON.parse @order.payment.extra_data
        vbank = Inicis::Standard::Rails::Paymethod::Vbank.new data: extra_data
        transaction_info = vbank.transaction_info
      end
    elsif payment_method.is_a? PaypalShopstory::PaymentMethod
      transaction_info = PaypalShopstory::Paypal.new data: {transaction_number: @order.payment.transaction_number}
    end

    @props = {
      globalVars: @globalVars,
      order_info: {
        order_number: @order.id,
        transaction_info: transaction_info,
        support_email: current_shop.email
      }
    }
  end

  private
  def authenticate_order!
    @order = Order.find params[:oid]
    @order.reset_confirmation_token if @order.is_a?(ShopstoryTicket::Booking)

    unless @order && @order.payment
      redirect_to customer_root_path
    end
  end
end
