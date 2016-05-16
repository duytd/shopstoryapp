class Customer::PaymentPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      payment_method: Customer::PaymentMethodPresenter.new(@object.payment_method)
    }
  end
end
