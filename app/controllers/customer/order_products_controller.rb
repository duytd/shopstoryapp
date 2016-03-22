class Customer::OrderProductsController < Customer::BaseController
  load_and_authorize_resource

  def create
    if order_product = current_order.order_products.find_by(variation_id: params[:order_product][:variation_id])
      order_product.quantity = order_product.quantity + params[:order_product][:quantity].to_i
    else
      order_product = current_order.order_products.new order_product_params
    end

    if order_product.save
      render json: current_order.order_products, status: :ok
    else
      render json: order_product.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    if @order_product.update order_product_params
      render json: current_order.order_products, status: :ok
    else
      render json: @order_product.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @order_product.destroy
    render json: current_order.order_products, status: :ok
  end

  private
  def order_product_params
    params.require(:order_product).permit :variation_id, :quantity
  end
end
