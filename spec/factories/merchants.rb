FactoryGirl.define do
  factory :merchant do
    password = "passwordexample"
    shop_name "Example"
    email "example@shopstoryapp.com"
    password password
    password_confirmation password

    after(:build) do |merchant|
      merchant.class.skip_callback(:create, :after, :create_merchant_shop!)
    end
  end
end
