class Merchant::CategoryPresenter < Merchant::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      slug: @object.slug,
      name_en: @object.name_en,
      name_ko: @object.name_ko
    }
  end
end
