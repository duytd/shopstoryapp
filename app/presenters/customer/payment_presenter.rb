class Customer::PaymentPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
    }
  end
end
