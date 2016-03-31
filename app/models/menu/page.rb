class Menu::Page < MenuItem
  validates :value, presence: true

  def url
    customer_page_path value
  end
end
