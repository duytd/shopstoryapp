FactoryGirl.define do
  factory :shop do
    name "Shop Name"
    legal_name "Shop Legal Name"
    phone "0123456789"
    street "Street Name"
    city "City Name"
    country "Country Name"
    zip_code "10000"
    time_zone "GMT+7"
    weight_unit 1
    subdomain "subdomain"
    currency "USD"
    association :theme, factory: :default_theme
    merchant

    after(:build) do |shop|
      shop.class.skip_callback(:create, :after, :setup_data)
      shop.class.skip_callback(:save, :after, :setup_theme)
    end
  end
end
