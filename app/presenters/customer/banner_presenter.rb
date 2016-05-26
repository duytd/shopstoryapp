class Customer::BannerPresenter < Customer::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      name: @object.name,
      banner_items: @object.banner_items.map{|b| present(b)}
    }
  end
end
