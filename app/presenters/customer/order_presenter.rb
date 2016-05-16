class Customer::OrderPresenter < Presenter
  def as_json(*)
    customer = @object.customer ? Customer::CustomerPresenter.new(@object.customer) : nil
    shipping_address = @object.shipping_address ? Customer::AddressPresenter.new(@object.shipping_address) : nil
    billing_address = @object.billing_address ? Customer::AddressPresenter.new(@object.billing_address) : nil
    payment = @object.payment ? Customer::PaymentPresenter.new(@object.payment) : nil

    {
      id: @object.id,
      subtotal: @object.subtotal,
      shipping: @object.shipping,
      tax: @object.tax,
      total: @object.total,
      status: @object.status,
      currency: @object.currency,
      locale: @object.locale,
      current_step: @object.current_step,
      customer: customer,
      shipping_address: shipping_address,
      billing_address: billing_address,
      payment: payment,
      order_products: @object.order_products.map{|op| Customer::OrderProductPresenter.new(op) }
    }
  end
end
