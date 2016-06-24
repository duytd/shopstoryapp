FactoryGirl.define do
  factory :variation_option_value do
    name "X"
    variation_option
  end

  factory :other_variation_option_value do
    name "Y"
    variation_option
  end
end
