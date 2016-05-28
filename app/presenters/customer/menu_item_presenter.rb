class Customer::MenuItemPresenter < Customer::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      name_en: @object.name_en,
      name_ko: @object.name_ko,
      url: @object.url,
      children: @object.children.map{|c| present(c, {sti: true})}
    }
  end
end
