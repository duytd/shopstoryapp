FactoryGirl.define do
  factory :theme do
    name "Theme Name"
    description "Theme Description"
    directory "theme-directory"
    default false
    actived true
  end

  factory :default_theme, parent: :theme do
    default true
    name "Default"
    directory "default"
  end
end
