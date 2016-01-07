class Merchant::OrdersController < Merchant::BaseController
  load_and_authorize_resource

  def index
    if request.delete?
      delete_all
    else
      list_all
    end
   end
  
  def new
  end

  def show
  end

  def edit
  end

  def update
  end

  def destroy
    @order.destroy
    render json: nil, status: :ok
  end

  private
  def list_all
    @orders = Order.page params[:page]
  end

  def delete_all
    Order.where(id: params[:order_ids]).destroy_all
    render json: nil, status: :ok
  end
end
