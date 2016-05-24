class ShippingMethod < ActiveRecord::Base
  translates :name, :description
  globalize_accessors locales: [:en, :ko], attributes: [:name, :description]

  validates :name, translation_presence: true, translation_uniqueness: true
end
