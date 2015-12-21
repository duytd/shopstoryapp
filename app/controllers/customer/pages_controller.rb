require "inicis/standard/rails/paymethod/vbank"

class Customer::PagesController < Customer::BaseController
  before_action :authenticate_order!, only: :thank_you

  def home
  end

  def checkout
  end

  def thank_you
    if current_order.payment.extra_data
      extra_data = JSON.parse current_order.payment.extra_data
      vbank = Inicis::Standard::Rails::Paymethod::Vbank.new data: extra_data
      @transaction_info = vbank.transaction_info
    end

    cookies.delete :cart
  end

  private
  def authenticate_order!
    unless current_order.payment
      redirect_to customer_root_path
    end
  end
end
