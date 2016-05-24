class Merchant::OrderPresenter < Presenter
  def as_json(*)
    customer = @object.customer ? Merchant::CustomerPresenter.new(@object.customer) : nil
    shipping_address = @object.shipping_address ? Merchant::AddressPresenter.new(@object.shipping_address) : nil
    billing_address = @object.billing_address ? Merchant::AddressPresenter.new(@object.billing_address) : nil
    payment = @object.payment ? Merchant::PaymentPresenter.new(@object.payment) : nil

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
      order_products: @object.order_products.map{|op| Merchant::OrderProductPresenter.new(op) },
      created_at: @object.created_at,
      updated_at: @object.updated_at
    }
  end
end
