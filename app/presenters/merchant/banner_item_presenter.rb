class Merchant::BannerItemPresenter < Merchant::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      image: @object.image,
      text: @object.text,
      link: @object.link,
      show_image: @object.show_image
    }
  end
end
