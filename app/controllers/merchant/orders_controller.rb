class Merchant::OrdersController < ApplicationController
  def index
    @orders = Order.paginate Settings.paging.order
  end

  def show
  end

  def update
  end

  def destroy
  end
end
