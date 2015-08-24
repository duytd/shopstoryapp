FactoryGirl.define do
  factory :merchant do
    password = Faker::Internet.password(8,12)
    subdomain Faker::Internet.user_name
    email Faker::Internet.email
    password password
    password_confirmation password
  end
end
