class Shops::CreateInitialData < ApplicationInteraction
  object :shop

  def execute
    Apartment::Tenant.switch(shop.subdomain) do
      compose(EmailTemplates::CreateInitialData)
      compose(PaymentMethods::CreateInitialData)
      compose(CustomPages::CreateInitialData, shop: shop)
      compose(Menus::CreateInitialData, shop: shop)
    end
  end
end
