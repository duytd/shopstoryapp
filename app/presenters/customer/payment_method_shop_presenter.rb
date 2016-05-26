class Customer::PaymentMethodShopPresenter < Customer::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      payment_method: present(@object.payment_method, {presenter_klass: Customer::PaymentMethodPresenter})
    }
  end
end
