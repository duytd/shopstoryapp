class Themes::Assets::GetCompiledCode < ApplicationInteraction
  object :theme
  string :subdomain
  string :type

  def execute
    Apartment::Tenant.switch subdomain do
      prefix = ""
      postfix = ""
      delimiter = "\s"

      case type
      when "javascript"
      when "stylesheet"
      when "locale"
        delimiter = ","
        prefix = "SingularCart.translations = {"
        postfix = "}"
      else
        raise InvalidAssetType
      end

      copy type, delimiter, prefix, postfix
    end
  end

  private

  def copy type, delimiter="\s", prefix="", postfix=""
    content = ""
    compiled_assets = Asset.type_class(type).where(theme_id: theme.id)

    compiled_assets.each do |asset|
      content << delimiter unless content.empty?
      content << asset.content
    end

    prefix << content << postfix
  end
end
