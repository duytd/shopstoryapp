class Customer::OptionPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      name: @object.name,
      option_values: @object.variation_option_values.map{|v| Customer::OptionValuePresenter.new(v)}
    }
  end
end
