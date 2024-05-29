# == Schema Information
#
# Table name: public.shipping_methods
#
#  id                 :integer          not null, primary key
#  active             :boolean          default(TRUE)
#  description        :text
#  name               :string
#  tracking_url       :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  shipping_method_id :integer          not null
#
class ShippingMethod < ApplicationRecord
  translates :name, :description
  globalize_accessors locales: [:en, :ko], attributes: [:name, :description]

  validates :name, translation_presence: true, translation_uniqueness: true

  scope :is_active, ->{where active: true}
end
