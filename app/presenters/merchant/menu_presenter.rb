class Merchant::MenuPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      name: @object.name,
      position: @object.position,
      active: @object.active,
      menu_items: @object.menu_items.is_parent.map{|item| Merchant::MenuItemPresenter.new(item)}
    }
  end
end
