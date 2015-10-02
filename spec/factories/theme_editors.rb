FactoryGirl.define do
  factory :theme_editor do
    stylesheet "body{color: #fff}"
    javascript "alert('It is ringing')"
    association :theme, factory: :default_theme
    shop
  end
end
