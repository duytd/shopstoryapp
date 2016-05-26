class Merchant::ShippingRatePresenter < Merchant::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      type: @object.type.underscore,
      name_en: @object.name_en,
      name_ko: @object.name_ko,
      rate: @object.rate,
      min_price: @object.min_price,
      active: @object.active
    }
  end
end
