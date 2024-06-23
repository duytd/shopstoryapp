class Themes::CreateBundles < ApplicationInteraction
  object :shop
  object :theme

  def execute
    bundle = ThemeBundle.where(theme_id: theme.id, shop_id: shop.id).first_or_initialize
    bundle.javascript = compose(Themes::Assets::GetCompiledCode, theme: theme, subdomain: shop.subdomain, type: "javascript")
    bundle.stylesheet = compose(Themes::Assets::GetCompiledCode, theme: theme, subdomain: shop.subdomain, type: "stylesheet")
    bundle.locale = compose(Themes::Assets::GetCompiledCode, theme: theme, subdomain: shop.subdomain, type: "locale")
    bundle.template = compose(Themes::Templates::GetCompiledCode, theme: theme, subdomain: shop.subdomain)
    bundle.save

    errors.merge!(bundle.errors)
    bundle
  end
end
