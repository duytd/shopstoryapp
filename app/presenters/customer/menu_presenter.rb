class Customer::MenuPresenter < Customer::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      position: @object.position,
      active: @object.active,
      menu_items: @object.menu_items.is_parent.map{|m| present(m, {sti: true})}
    }
  end
end
