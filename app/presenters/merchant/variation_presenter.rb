class Merchant::VariationPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      name_ko: @object.name_ko,
      name_en: @object.name_en,
      variation_option_values: variation_variation_option_values,
      master_image: master_image,
      variation_image: variation_image,
      has_image: has_image?,
      values: variation_option_values.map{|v| v.id}
    }
  end
end
