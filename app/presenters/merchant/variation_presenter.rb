class Merchant::VariationPresenter < Presenter
  def as_json(*)
    {
      id: @object.id
    }
  end
end
