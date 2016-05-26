class Customer::OrderProductPresenter < Customer::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      unit_price: @object.unit_price,
      quantity: @object.quantity,
      order_id: @object.order_id,
      variation_id: @object.variation_id,
      variation: present(@object.variation)
    }
  end
end
