class InvalidAssetType < StandardError
end

class Themes::Assets::CreateFiles < ApplicationInteraction
  object :theme
  string :subdomain
  string :type

  def execute
    Apartment::Tenant.switch subdomain do
      case type
      when "javascript"
        dir = "#{Rails.root}/app/javascript/src/customer/themes/#{theme.directory}/assets/javascripts"
        extension = "js"
      when "stylesheet"
        dir = "#{Rails.root}/app/javascript/src/customer/themes/#{theme.directory}/assets/stylesheets"
        extension = "scss"
      when "locale"
        dir = "#{Rails.root}/app/javascript/src/customer/themes/#{theme.directory}/locales"
        extension = "json"
      else
        raise InvalidAssetType
      end

      process type, dir, extension
    end
  end

  private

  def process type, dir, extension
    assets = []

    Dir.glob("#{dir}/*.#{extension}") do |file|
      file_content = File.read file
      file_name = File.basename file

      assets << set_asset(type, file_name, file_content)
    end

    Asset.import assets, validate: false, on_duplicate_key_update: [:content]
  end

  def set_asset type, file_name, file_content
    asset = Asset.type_class(type).where(name: file_name, theme_id: theme.id).first_or_initialize
    asset.content = file_content
    asset
  end
end
