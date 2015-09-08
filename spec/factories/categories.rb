FactoryGirl.define do
  factory :category do
    name_en "English Name"
    name_ko "Korean Name"
  end

  factory :other_category, class: Category do
    name_en "Other English Name"
    name_ko "Other Korean Name"
  end
end
