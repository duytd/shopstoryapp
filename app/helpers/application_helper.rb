module ApplicationHelper
  def full_title page_title
    base_title = t "application.title"
    page_title.empty? ? base_title : page_title << " | " << base_title
  end

  def load_translation translations, locale
    translations.detect{|e| e.locale == locale}
  end
end
