class Product < ActiveRecord::Base
  include Orderable

  translates :name, :description
  globalize_accessors locales: [:en, :ko], attributes: [:name, :description]

  has_many :category_products, dependent: :destroy
  has_many :categories, through: :category_products
  has_many :variations
  has_many :product_tags, dependent: :destroy
  has_many :tags, through: :product_tags
  has_many :product_images, dependent: :destroy

  validates :name, translation_presence: true, translation_uniqueness: true
  validates :price, presence: true, numericality: {minimum: 0, allow_blank: true}

  I18n.available_locales.each do |locale|
    validates "name_#{locale}", length: {minimum: 2}, allow_blank: true
  end

  accepts_nested_attributes_for :variations, allow_destroy: true,
    reject_if: proc {|a| a[:color].blank? && a[:size].blank?}
  accepts_nested_attributes_for :product_images, allow_destroy: true,
    reject_if: proc {|a| a[:image].blank?}

  scope :visible, ->{where visibility: true}
  scope :available, ->{where "in_stock > ?", 0}

  def as_json options={}
    super.as_json(options).merge({name_en: name_en, name_ko: name_ko, images: product_images})
  end
end
