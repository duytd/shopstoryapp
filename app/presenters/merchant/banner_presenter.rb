class Merchant::BannerPresenter < Merchant::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      name: @object.name
    }
  end
end
