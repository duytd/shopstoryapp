class TranslationUniquenessValidator < ActiveModel::EachValidator
  def validate_each record, attribute, value
    I18n.available_locales.each do |locale|
      klass = record.class
      table_name = "#{klass.name.tableize}"
      table_name_locale = "#{klass.name.underscore}_translations"
      attribute_locale = "#{attribute}_#{locale}"
      value_locale = record.send attribute_locale
      value_locale = ActiveRecord::Base.connection.quote value_locale

      relation = "#{table_name_locale}.name = #{value_locale}"
      relation << " AND #{table_name}.id <> '#{record.send(:id)}'" if record.persisted?

      if value_locale.present? && klass.with_translations(locale).where(relation).exists?
        record.errors.add(attribute_locale, :taken)
      end
    end
  end
end
