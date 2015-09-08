class Category < ActiveRecord::Base
  has_many :category_products, dependent: :destroy
  has_many :products, through: :category_products

  translates :name
  globalize_accessors locales: [:en, :ko], attributes: [:name]

  validates :name, translation_presence: true, translation_uniqueness: true

  I18n.available_locales.each do |locale|
    validates "name_#{locale}", length: {minimum: 6}, allow_blank: true
  end
end
