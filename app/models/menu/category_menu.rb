class Menu::CategoryMenu < MenuItem
  validates :value, presence: true

  def url
    category = Category.find value
    customer_category_path category
  end
end
