class Customer::ProductPresenter < Customer::BasePresenter
  def as_json(*)
    {
      id: @object.id,
      slug: @object.slug,
      name_en: @object.name_en,
      name_ko: @object.name_ko,
      description_ko: @object.description_ko.gsub("<p><br></p>", ""),
      description_en: @object.description_en.gsub("<p><br></p>", ""),
      visibility: @object.visibility,
      price: @object.price,
      sale_off: @object.sale_off,
      sku: @object.sku,
      in_stock: @object.in_stock,
      vendor: @object.vendor,
      unlimited: @object.unlimited,
      featured_image: ProductImage.featured(@object.product_images),
      images: @object.product_images
    }
  end
end
