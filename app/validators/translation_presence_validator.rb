class TranslationPresenceValidator < ActiveModel::EachValidator
  def validate_each record, attribute, value
    if values_for_locales(record, attribute).all? &:blank?
      I18n.available_locales.each do |locale|
        record.errors.add "#{attribute}_#{locale}", options[:message] || :blank
      end
    end
  end

  private
  def values_for_locales record, attribute
    I18n.available_locales.map {|locale| record.read_attribute(attribute, locale: locale)}
  end
end
