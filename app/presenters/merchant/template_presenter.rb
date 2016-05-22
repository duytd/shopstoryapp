class Merchant::TemplatePresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      directory: @object.directory,
      name: @object.name,
      content: @object.content,
      theme_id: @object.theme_id
    }
  end
end
