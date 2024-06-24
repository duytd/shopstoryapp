class Shops::CreateSampleData < ApplicationInteraction
  object :shop

  def execute
    Apartment::Tenant.switch(shop.subdomain) do
      compose(Products::CreateSampleData)
      compose(Categories::CreateSampleData)
    end
  end
end
