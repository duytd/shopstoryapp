class Menu::Category < MenuItem
  validates :value, presence: true

  def url
    customer_category_path value
  end
end
