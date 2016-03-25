class TranslationPresenceValidator < ActiveModel::EachValidator
  def validate_each record, attribute, value
    I18n.available_locales.each do |locale|
      record.errors.add("#{attribute}_#{locale}", options[:message] || :blank) if value_for_locale(record, attribute, locale).blank?
    end
  end

  private
  def value_for_locale record, attribute, locale
    record.read_attribute attribute, locale: locale
  end
end
