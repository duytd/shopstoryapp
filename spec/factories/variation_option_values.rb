FactoryGirl.define do
  factory :variation_option_value do
    name "X"
    association :variation_option, factory: :variation_option
  end

  factory :other_variation_option_value, class: VariationOptionValue do
    name "Y"
  end
end
