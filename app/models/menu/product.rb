class Menu::Product < MenuItem
  validates :value, presence: true

  def url
    customer_product_path value
  end
end
