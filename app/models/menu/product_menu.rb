class Menu::ProductMenu < MenuItem
  validates :value, presence: true

  def url
    product = Product.find value
    customer_product_path product
  end
end
