class Category < ApplicationRecord
  include Orderable

  extend FriendlyId
  friendly_id :name_en, use: [:slugged, :finders]

  translates :name
  globalize_accessors locales: [:en, :ko], attributes: [:name]

  include Searchable
  include Elasticsearch::Model::Globalize::MultipleFields
  mapping do
    indexes :name_ko, analyzer: "ngram_analyzer"
    indexes :name_en, analyzer: "ngram_analyzer"
  end

  has_many :category_products, dependent: :destroy, auto_include: false
  has_many :products, through: :category_products, auto_include: false
  has_many :variations, through: :products
  has_one :seo_tag, as: :seoable, dependent: :destroy
  has_many :menu_items, foreign_key: "value", dependent: :destroy
  accepts_nested_attributes_for :seo_tag, allow_destroy: false, reject_if: :all_blank

  validates :name, translation_presence: true, translation_uniqueness: true
  I18n.available_locales.each do |locale|
    validates "name_#{locale}", length: {minimum: 2}, allow_blank: true
  end

  after_save { IndexerWorker.perform_async(:index, self.id, "Category", "Customer::CategoryPresenter") }
  after_destroy { IndexerWorker.perform_async(:delete, self.id, "Category", "Customer::CategoryPresenter") }

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

    if min && max && min < max
      unit = (max - min)/4.to_i
      last_tick = min + 4*unit
      last_tick = max if last_tick < max

      [
        [min, min + 1*unit],
        [min + 1*unit, min + 2*unit],
        [min + 2*unit, min + 3*unit],
        [min + 3*unit, last_tick]
      ]
    else
      []
    end
  end

  def vendor_filter
    filter_list = []
    products.each do |p|
      unless filter_list.include?(p.vendor) || p.vendor.blank?
        filter_list << p.vendor
      end
    end

    filter_list
  end

  def self.search_fields
    %w{ name_ko name_en }
  end
end
