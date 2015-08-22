FactoryGirl.define do
  factory :user do
    first_name Faker::Name.first_name
    last_name Faker::Name.last_name
    role 1 
    company Faker::Name.name
    phone Faker::PhoneNumber.phone_number
    address Faker::Address.street_address
    city Faker::Address.city
    country Faker::Address.country
    zip_code Faker::Address.zip_code
    shop
  end
end
