FactoryGirl.define do
  factory :merchant do
    password = "passwordexample"
    shop_name "Example"
    email "example@shopstoryapp.com"
    password password
    password_confirmation password
  end
end
