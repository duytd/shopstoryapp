require "json"

namespace :theme do
  $root_dir = "#{Rails.root}/app/assets/javascripts/customer/themes"

  desc "generate default theme for ShopStory"
  task generate_themes: :environment do
    theme_dirs.each do |dir|
      info = theme_information dir
      default = if dir.downcase == "default" then true else false end

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

  private
  def theme_dirs
    Dir.entries($root_dir).reject{|dir_name| dir_name =~ /^\.{1,2}$/}
  end

  def theme_information dir
    settings = File.read "#{$root_dir}/#{dir}/config/settings.json"
    JSON.parse settings
  end
end
