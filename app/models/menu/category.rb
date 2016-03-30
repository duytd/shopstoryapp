class Menu::Category < MenuItem
  def url
    customer_category_path value
  end
end
