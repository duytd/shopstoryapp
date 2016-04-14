class TranslationLengthValidator < ActiveModel::EachValidator
  def validate_each record, attribute, value
    I18n.available_locales.each do |locale|
      attr_value = value_for_locale record, attribute, locale

      unless attr_value.blank?
        if options[:minimum].present? && attr_value.length < options[:minimum]
          record.errors.add("#{attribute}_#{locale}", options[:message] || :too_short, count: options[:minimum])
        end

        if options[:maximum].present? && attr_value.length > options[:maximum]
          record.errors.add("#{attribute}_#{locale}", options[:message] || :too_long, count: options[:maximum])
        end
      end
    end
  end

  private
  def value_for_locale record, attribute, locale
    record.read_attribute attribute, locale: locale
  end
end
