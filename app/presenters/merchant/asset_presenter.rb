class Merchant::AssetPresenter < Merchant::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      type: @object.type.underscore,
      name: @object.name,
      image: @object.image,
      content: @object.content,
      directory: @object.directory,
      theme_id: @object.theme_id
    }
  end
end
