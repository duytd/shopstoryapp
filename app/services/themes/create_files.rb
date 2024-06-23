class Themes::CreateFiles < ApplicationInteraction
  object :shop
  object :theme

  def execute
    compose(Themes::Assets::CreateFiles, theme: theme, subdomain: shop.subdomain, type: "javascript")
    compose(Themes::Assets::CreateFiles, theme: theme, subdomain: shop.subdomain, type: "stylesheet")
    compose(Themes::Assets::CreateFiles, theme: theme, subdomain: shop.subdomain, type: "locale")
    compose(Themes::Templates::CreateFiles, theme: theme, subdomain: shop.subdomain)
  end
end
