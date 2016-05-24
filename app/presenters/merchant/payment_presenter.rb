class Merchant::PaymentPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      state: @object.state,
      transaction_number: @object.transaction_number,
      payment_method: Merchant::PaymentMethodPresenter.new(@object.payment_method)
    }
  end
end
