FactoryGirl.define do
  factory :subscription do
    stripe_id "MyString"
plan nil
last_four "MyString"
card_type "MyString"
current_price 1.5
shop nil
  end

end
