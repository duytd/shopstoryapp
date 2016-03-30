class Menu::Product < MenuItem
  def url
    customer_product_path value
  end
end
