class Category < ActiveRecord::Base
  include Orderable
  extend FriendlyId
  friendly_id :name, use: [:slugged, :finders]

  has_many :category_products, dependent: :destroy
  has_many :products, through: :category_products
  has_many :variations, through: :products
  has_one :seo_tag, as: :seoable, dependent: :destroy

  translates :name
  globalize_accessors locales: [:en, :ko], attributes: [:name]

  validates :name, translation_presence: true, translation_uniqueness: true
  accepts_nested_attributes_for :seo_tag, allow_destroy: false, reject_if: :all_blank

  I18n.available_locales.each do |locale|
    validates "name_#{locale}", length: {minimum: 2}, allow_blank: true
  end

  def as_json options={}
    super.as_json(options).merge({name_en: name_en, name_ko: name_ko, seo_tag: seo_tag})
  end

  def price_filter
    price_list = []

    variations.each do |v|
      unless price_list.include?(v.price)
        price_list << v.price
      end
    end

    price_list.sort!
    min = price_list.first
    max = price_list.last
    unit = (max - min)/4.to_i
    last_tick = min + 4*unit
    last_tick = max if last_tick < max

    [
      [min, min + 1*unit],
      [min + 1*unit, min + 2*unit],
      [min + 2*unit, min + 3*unit],
      [min + 3*unit, last_tick]
    ]
  end

  def vendor_filter
    filter_list = []
    products.each do |p|
      unless filter_list.include?(p.vendor) || p.vendor.nil?
        filter_list << p.vendor
      end
    end

    filter_list
  end
end
