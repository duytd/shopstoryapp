class Merchant::SeoTagPresenter < Merchant::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      title_en: @object.title_en,
      title_ko: @object.title_ko,
      meta_description_ko: @object.meta_description_ko,
      meta_description_en: @object.meta_description_en,
    }
  end
end
