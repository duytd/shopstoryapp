class InvalidAssetType < StandardError
end

class AssetService
  def initialize params
    @theme = params[:theme]
    @subdomain = params[:subdomain]
  end

  def get_compiled_code type
    Apartment::Tenant.reset
    prefix = ""
    postfix = ""
    delimiter = "\s"

    case type
    when "javascript"
    when "stylesheet"
    when "locale"
      delimiter = ","
      prefix = "var I18n = I18n || {}; I18n.translations = {"
      postfix = "}"
    else
      raise InvalidAssetType
    end

    copy type, delimiter, prefix, postfix
  end

  def create_bundle type
    prefix = ""
    postfix = ""
    delimiter = "\s"

    case type
    when "javascript"
      dir = "#{Rails.root}/app/assets/javascripts/customer/themes/#{@theme.directory}/assets/javascripts"
      extension = "js"
    when "stylesheet"
      dir = "#{Rails.root}/app/assets/javascripts/customer/themes/#{@theme.directory}/assets/stylesheets"
      extension = "scss"
    when "locale"
      dir = "#{Rails.root}/app/assets/javascripts/customer/themes/#{@theme.directory}/locales"
      extension = "json"
      delimiter = ","
      prefix = "var I18n = I18n || {}; I18n.translations = {"
      postfix = "}"
    else
      raise InvalidAssetType
    end

    process type, dir, extension, delimiter, prefix, postfix
  end

  def process type, dir, extension, delimiter="\s", prefix="", postfix=""
    content = ""
    assets = []

    Dir.glob("#{dir}/*.#{extension}") do |file|
      file_content = File.read file
      file_name = File.basename file

      assets << set_asset(type, file_name, file_content)
      content << delimiter unless content.empty?
      content << file_content
    end

    Asset.import assets, on_duplicate_key_update: [:content]

    prefix << content << postfix
  end

  def copy type, delimiter="\s", prefix="", postfix=""
    content = ""
    Apartment::Tenant.reset
    tenant_assets= []
    compiled_assets = Asset.type_class(type).where(theme_id: @theme.id)

    compiled_assets.each do |asset|
      tenant_assets << set_asset(type, asset.name, asset.content)
      content << delimiter unless content.empty?
      content << asset.content
    end

    Apartment::Tenant.switch @subdomain
    Asset.import tenant_assets, on_duplicate_key_update: [:content]

    prefix << content << postfix
  end

  def set_asset type, file_name, file_content
    Apartment::Tenant.switch(@subdomain) unless @subdomain.nil?
    asset = Asset.type_class(type).where(name: file_name, theme_id: @theme.id).first_or_initialize
    asset.content = file_content
    asset
  end
end
