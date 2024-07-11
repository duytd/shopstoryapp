class Merchant::VariationPresenter < Merchant::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      name_en: @object.name_en,
      name_ko: @object.name_ko,
      price: @object.price,
      in_stock: @object.in_stock,
      sku: @object.sku,
      master: @object.master?,
      image: { image: @object.image },
      product_id: @object.product_id,
      product_slug: @object.product.slug,
      variation_option_values: @object.variation_variation_option_values,
      unlimited: @object.unlimited
    }
  end
end
