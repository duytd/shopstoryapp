class Merchant::ProductOrderPresenter < Merchant::BasePresenter
  def as_json(*)
    customer = @object.customer ? present(@object.customer) : nil
    shipping_address = @object.shipping_address ? present(@object.shipping_address) : nil
    billing_address = @object.billing_address ? present(@object.billing_address) : nil
    payment = @object.payment ? present(@object.payment) : nil
    shipment = @object.shipment ? present(@object.shipment) : nil

    {
      id: @object.id,
      subtotal: @object.subtotal,
      shipping: @object.shipping,
      tax: @object.tax,
      total: @object.total,
      status: @object.status,
      currency: @object.currency,
      locale: @object.locale,
      unprocessed: @object.unprocessed?,
      customer: customer,
      shipping_address: shipping_address,
      billing_address: billing_address,
      payment: payment,
      shipment: shipment,
      order_products: @object.order_products.map{|op| present(op) },
      created_at: @object.created_at,
      updated_at: @object.updated_at
    }
  end
end
