class Customer::CustomPagePresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      title: @object.title,
      content: @object.content,
      slug: @object.slug
    }
  end
end
