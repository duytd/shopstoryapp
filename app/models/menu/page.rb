class Menu::Page < MenuItem
  validates :value, presence: true

  def url
    customer_custom_page_path value
  end
end
