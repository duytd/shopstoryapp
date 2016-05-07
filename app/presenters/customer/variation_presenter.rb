class Customer::VariationPresenter < Presenter
  def as_json(*)
    {
      id: @object.id,
      name_en: @object.product.name_en,
      name_ko: @object.product.name_ko,
      price: @object.product.price,
      in_stock: @object.product.in_stock,
      sku: @object.product.sku,
      master: @object.master?,
      image: @object.variation_image,
      product_id: @object.product_id,
      product_slug: @object.product.slug,
    }
  end
end
