class Merchant::MenuPresenter < Merchant::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      name: @object.name,
      position: @object.position,
      active: @object.active,
      menu_items: @object.menu_items.is_parent.map{|m| present(m, {presenter_klass: "Customer::#{m.class.superclass.name}Presenter".constantize})}
    }
  end
end
