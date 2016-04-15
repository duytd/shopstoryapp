class Asset::Locale < Asset
  def self.bundle bundle
    content = "var I18n = I18n || {}; I18n.translations = {"
    content << Asset::Locale.all.map{|x| x.content}.join(",")
    content << "}"

    bundle.locale = content
    bundle.save!
  end

  def path
    "locales/#{name}"
  end
end
