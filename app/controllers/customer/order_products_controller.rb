class Customer::OrderProductsController < Customer::BaseController
  load_and_authorize_resource

  def create
    if order_product = current_order.order_products.find_by(product_id: params[:order_product][:product_id])
      order_product.quantity = order_product.quantity + params[:order_product][:quantity].to_i
    else
      order_product = current_order.order_products.new order_product_params
    end

    if order_product.save
      render json: {data: current_order.order_products, status: :success}
    else
      render json: {errors: order_product.errors.full_messages, status: :unprocessed_entity}
    end
  end

  def update
    if @order_product.update order_product_params
      render json: {data: current_order.order_products, status: :success}
    else
      render json: {errors: @order_product.errors.full_messages, status: :unprocessed_entity}
    end
  end

  def destroy
    @order_product.destroy
    render json: {data: current_order.order_products, status: :success}
  end

  private
  def order_product_params
    params.require(:order_product).permit :product_id, :quantity
  end
end
