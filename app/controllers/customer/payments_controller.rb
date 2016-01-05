require "rubygems"
require "browser"

class Customer::PaymentsController < Customer::BaseController
  def show
    case current_order.payment_method.name
    when "INICIS Payment"
      unless browser.mobile?
        path = customer_inicis.transaction_pay_path
      else
        path = customer_inicis.mobile_transaction_pay_path
      end
    end

    redirect_to path
  end
end
