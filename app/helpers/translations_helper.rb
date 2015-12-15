module TranslationsHelper
  def load_translation translations, locale
    translations.detect{|e| e.locale == locale}
  end
end
