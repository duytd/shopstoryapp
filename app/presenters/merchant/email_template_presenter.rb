class Merchant::EmailTemplatePresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      name: @object.name,
      content: @object.content
    }
  end
end
