class Merchant::ProductPresenter < Merchant::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      slug: @object.slug,
      name_en: @object.name_en,
      name_ko: @object.name_ko,
      description: @object.description,
      visibility: @object.visibility,
      price: @object.price,
      sale_off: @object.sale_off,
      sku: @object.sku,
      in_stock: @object.in_stock,
      vendor: @object.vendor,
      featured: @object.featured,
      unlimited: @object.unlimited,
      featured_image: ProductImage.featured(@object.product_images),
      images: @object.product_images
    }
  end
end
