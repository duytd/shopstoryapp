class ProductService
  def create_sample_data
    i = 0
    products = []

    5.times do
      product = Product.new name_en: "Product #{i}", name_ko: "제품 #{i}"
      product.category_products.build category_id: Category.all.sample.id
      product.price = 1000
      product.in_stock = 10
      product.featured = true if i % 2 == 0
      products << product
      i = i + 1
    end

    Product.import products
  end
end
