class Customer::VariationOptionPresenter < Customer::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      name: @object.name,
      option_values: @object.variation_option_values.map{|v| present(v)}
    }
  end
end
