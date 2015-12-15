class Customer::PaymentsController < ApplicationController
  def show
    redirect_to customer_inicis.transaction_pay_path
  end
end
