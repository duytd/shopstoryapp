class Asset::Locale < Asset
  def update_theme_bundle
    content = "var I18n = I18n || {}; I18n.translations = {"
    content << Asset::Locale.filter_by_theme(theme).map{|x| x.content}.join(",")
    content << "}"

    theme_bundle.locale = content
    theme_bundle.save!
  end

  def path
    "locales/#{name}"
  end
end
