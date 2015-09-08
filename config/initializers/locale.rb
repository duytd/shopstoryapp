I18n.available_locales = [:en, :ko]
I18n.default_locale = :ko
I18n.load_path += Dir[Rails.root.join("config", "locales", "**", "*.{rb,yml}")]
