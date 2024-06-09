class Customer::OrderProductsController < Customer::BaseController
  load_and_authorize_resource
  before_action :authenticate_order, only: :create
  before_action :authenticate_order_product, only: [:update, :destroy]

  def create
    quantity = params[:order_product][:quantity]
    variation_id = params[:order_product][:variation_id]

    result = OrderService.new({order: current_order}).add_item variation_id, quantity
    order_product = result[:item]

    set_order_token(result[:token]) if result[:token]

    if order_product.save
      current_order.save
      render json: present(current_order), status: :ok
    else
      render json: order_product.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    if @order_product.update order_product_params
      current_order.save
      render json: present(current_order), status: :ok
    else
      render json: @order_product.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @order_product.destroy
    current_order.save
    render json: present(current_order), status: :ok
  end

  private
  def order_product_params
    params.require(:order_product).permit :variation_id, :quantity
  end

  def set_order_token token
    cookies.permanent.signed[:order_token] = token
  end

  def authenticate_order
    head :unauthorized unless current_order.abandoned?
  end

  def authenticate_order_product
    head :unauthorized unless @order_product.order.abandoned?
  end
end
