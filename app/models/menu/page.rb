class Menu::Page < MenuItem
  validates :value, presence: true

  def url
    page = CustomPage.find value
    customer_custom_page_path page
  end
end
