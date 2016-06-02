class OrderService
  def initialize params
    @order = params[:order]
  end

  def add_item variation_id, quantity
    token = nil

    if @order.new_record?
      @order.save
      token = @order.token
    end

    item = @order.order_products.find_or_initialize_by(variation_id: variation_id)
    item.quantity = (item.quantity || 0) + quantity.to_i

    return {
      token: token,
      item: item
    }
  end
end
