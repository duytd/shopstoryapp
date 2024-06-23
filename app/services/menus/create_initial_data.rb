class Menus::CreateInitialData < ApplicationInteraction
  object :shop

  def execute
    create_main_menu
    create_footer_menu
  end

  private

  def create_main_menu
    main_menu = Menu.find_or_create_by(position: Menu.positions[:main])
    main_menu.update_attributes name: "Main menu"
    main_menu.menu_items.create([
      {
        name_en: "Home",
        name_ko: "홈페이지",
        type: MenuItem::TYPES_CLASSES_MAPPING[:home]
      },
      {
        name_en: "Catalog",
        name_ko: "목록",
        type: MenuItem::TYPES_CLASSES_MAPPING[:category_index]
      },
    ])
  end

  def create_footer_menu
    term = shop.term
    privacy = shop.privacy
    footer_menu = Menu.find_or_create_by(position: Menu.positions[:footer])
    footer_menu.update_attributes(name: "Footer menu")
    footer_menu.menu_items.create([
      {
        name_en: "Terms and Conditions",
        name_ko: "이용약관 및 규칙",
        type: MenuItem::TYPES_CLASSES_MAPPING[:custom_page],
        value: term.id
      },
      {
        name_en: "Privacy Policy ",
        name_ko: "개인정보 취급방침 및 청소년보호정책",
        type: MenuItem::TYPES_CLASSES_MAPPING[:custom_page],
        value: privacy.id
      },
    ])
  end
end
