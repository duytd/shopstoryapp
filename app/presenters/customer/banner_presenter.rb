class Customer::BannerPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      name: @object.name,
      banner_items: @object.banner_items.map{|item| Customer::BannerItemPresenter.new(item)}
    }
  end
end
