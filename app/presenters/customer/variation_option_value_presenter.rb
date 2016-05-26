class Customer::VariationOptionValuePresenter < Customer::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      name: @object.name,
    }
  end
end
