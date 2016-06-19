class Merchant::ShippingMethodPresenter < Merchant::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      name_ko: @object.name,
      name_en: @object.name_en,
      tracking_url: @object.tracking_url
    }
  end
end
