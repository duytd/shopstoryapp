class Merchant::OrdersController < Merchant::BaseController
  def index
    @orders = Order.page params[:page]
  end
  
  def new
  end

  def show
  end

  def update
  end

  def destroy
  end
end
