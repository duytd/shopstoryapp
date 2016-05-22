class Merchant::CustomPagePresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      title_ko: @object.title_ko,
      title_en: @object.title_en,
      content_en: @object.content_en,
      content_ko: @object.content_ko,
      slug: @object.slug
    }
  end
end
