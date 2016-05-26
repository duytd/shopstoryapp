class Customer::PaymentPresenter < Customer::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      state: @object.state,
      payment_method: present(@object.payment_method, {presenter_klass: Customer::PaymentMethodPresenter})
    }
  end
end
