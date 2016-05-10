class Menu::Product < MenuItem
  validates :value, presence: true

  def url
    product = Product.find value
    customer_product_path product
  end
end
