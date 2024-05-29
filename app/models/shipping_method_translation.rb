# == Schema Information
#
# Table name: public.shipping_method_translations
#
#  id                 :integer          not null, primary key
#  description        :text
#  locale             :string           not null
#  name               :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  shipping_method_id :integer          not null
#
# Indexes
#
#  index_d18925c68417b15023b73190fb04cfcefbb8f8d5  (shipping_method_id)
#  index_shipping_method_translations_on_locale    (locale)
#
class ShippingMethodTranslation < ApplicationRecord
  belongs_to :shipping_method
end
