class Customer::CustomPagePresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      title_ko: @object.title_ko,
      title_en: @object.title_en,
      content: @object.content,
      slug: @object.slug
    }
  end
end
