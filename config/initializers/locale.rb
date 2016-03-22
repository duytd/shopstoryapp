I18n.available_locales = [:en, :ko]

if Rails.env.development?
  I18n.default_locale = :en
else
  I18n.default_locale = :ko
end

I18n.load_path += Dir[Rails.root.join("config", "locales", "**", "*.{rb,yml}")]
