class Shops::CreateSampleData < ApplicationInteraction
  object :shop

  def execute
    Apartment::Tenant.switch(shop.subdomain) do
      compose(Categories::CreateSampleData)
      compose(Products::CreateSampleData)
    end
  end
end
