class Merchant::PaymentPresenter < Merchant::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      state: @object.state,
      transaction_number: @object.transaction_number,
      payment_method: present(@object.payment_method, {presenter_klass: Merchant::PaymentMethodPresenter})
    }
  end
end
