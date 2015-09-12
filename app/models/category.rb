class Category < ActiveRecord::Base
  include Orderable

  has_many :category_products, dependent: :destroy
  has_many :products, through: :category_products

  translates :name
  globalize_accessors locales: [:en, :ko], attributes: [:name]

  validates :name, translation_presence: true, translation_uniqueness: true

  I18n.available_locales.each do |locale|
    validates "name_#{locale}", length: {minimum: 2}, allow_blank: true
  end

  def as_json options={}
    super.as_json(options).merge({name_en: name_en})
  end
end
