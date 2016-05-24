class Customer::PaymentPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      state: @object.state,
      payment_method: Customer::PaymentMethodPresenter.new(@object.payment_method)
    }
  end
end
