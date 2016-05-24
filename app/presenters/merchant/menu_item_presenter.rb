class Merchant::MenuItemPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      name_ko: @object.name_ko,
      name_en: @object.name_en,
      children: @object.children.map{|c| Merchant::MenuItemPresenter.new(c)},
      position: @object.position,
      parent_id: @object.parent_id,
      type: @object.type.underscore,
      value: @object.value
    }
  end
end
