FactoryGirl.define do
  factory :plan do
    name "Plan Name"
    default false
    description "Plan Description"
    price 9.99
    transaction_fee 0.99
  end

  factory :default_plan, parent: :plan do
    name "Trial"
    default true
  end
end
