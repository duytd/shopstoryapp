class Merchants::CreateNewMerchant < ApplicationInteraction
  object :merchant, class: "Merchant"

  run_in_transaction!

  def execute
    merchant.save
    errors.merge!(merchant.errors)

    halt_if_errors!

    # Create shop
    shop = merchant.create_shop(name: merchant.shop_name, subdomain: merchant.shop_name, email: merchant.email)
    errors.merge!(shop.errors)

    halt_if_errors!

    # Setup initial data
    compose(Shops::CreateInitialData, shop: shop)

    PrepareThemeJob.perform_later(shop.id)

    merchant
  end
end
