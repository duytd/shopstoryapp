class Customer::OrderPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
    }
  end
end
