FactoryGirl.define do
  factory :theme do
    sequence(:name){|n| "Theme-#{n}"}
    sequence(:directory){|n| "directory_#{n}"}
    description "Theme Description"
    default false
    actived true
  end

  factory :default_theme, parent: :theme do
    default true
  end
end
