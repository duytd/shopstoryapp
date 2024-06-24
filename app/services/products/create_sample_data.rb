class Products::CreateSampleData < ApplicationInteraction
  def execute
    i = 0
    5.times do
      product = Product.find_or_initialize_by name_en: "Product #{i}", name_ko: "제품 #{i}"
      product.category_products.build category_id: Category.all.sample.id
      product.price = 1
      product.in_stock = 10
      product.featured = true if i % 2 == 0
      product.save
      i = i + 1
  end
end
