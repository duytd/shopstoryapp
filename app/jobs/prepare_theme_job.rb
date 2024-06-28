class PrepareThemeJob < ActiveJob::Base
  queue_as Settings.queues.default

  def perform(shop_id)
    shop = Shop.find(shop_id)

    # Create theme files
    Themes::CreateFiles.run!(shop: shop, theme: shop.theme)

    # Create theme bundles
    Themes::CreateBundles.run!(shop: shop, theme: shop.theme)
  end
end
