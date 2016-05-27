class Merchant::ShipmentPresenter < Merchant::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      status: @object.status,
      shipping_method: present(@object.shipping_method),
      tracking_code: @object.tracking_code
    }
  end
end
