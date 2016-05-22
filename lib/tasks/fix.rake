namespace :fix do
  task update_menu_types: :environment do
    Shop.all.each do |shop|
      Apartment::Tenant.switch shop.subdomain
      MenuItem.where(type: "Menu::Category").update_all type: "Menu::CategoryMenu"
      MenuItem.where(type: "Menu::CategoryAll").update_all type: "Menu::CategoryIndexMenu"
      MenuItem.where(type: "Menu::Product").update_all type: "Menu::ProductMenu"
      MenuItem.where(type: "Menu::ProductAll").update_all type: "Menu::ProductIndexMenu"
      MenuItem.where(type: "Menu::Url").update_all type: "Menu::UrlMenu"
      MenuItem.where(type: "Menu::Home").update_all type: "Menu::HomeMenu"
      MenuItem.where(type: "Menu::Page").update_all type: "Menu::CustomPageMenu"
    end
  end
end
