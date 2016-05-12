class Customer::OptionValuePresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      name: @object.name,
    }
  end
end
