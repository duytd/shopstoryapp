require "json"

namespace :theme do
  $root_dir = "#{Rails.root}/app/assets/javascripts/customer/themes"

  desc "generate default theme for ShopStory"
  task generate_themes: :environment do
    Theme.theme_dirs.each do |dir|
      info = Theme.get_theme_information dir
      default = if dir.downcase == "agatha" then true else false end

      Theme.create(
        directory: dir.downcase,
        name: dir.gsub(/-/, " ").capitalize,
        description: info["description"],
        author: info["author"],
        version: info["version"],
        default: default
      )
    end
  end

  desc "load default theme for existing ShopStory"
  task load_default_theme: :environment do
    default_theme = Theme.default
    Shop.all.each do |shop|
      default_theme.setup shop
    end
  end

  desc "Precompile all theme"
  task precompile: :environment do
    Theme.all.each do |theme|
      theme.precompile
    end
  end
end
