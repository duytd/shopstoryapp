class Customer::ProductPresenter < Customer::BasePresenter
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
      featured_image: @object.product_images.featured,
      images: @object.product_images
    }
  end
end
