class Product < ActiveRecord::Base
  ATTRIBUTES = %w{slug name_ko name_en description_ko description_en sku vendor in_stock price sale_off weight visibility featured flat_shipping_rate pay_shipping_on_delivery}

  include Orderable
  include Searchable

  extend FriendlyId
  friendly_id :name, use: [:slugged, :finders]

  translates :name, :description
  globalize_accessors locales: [:en, :ko], attributes: [:name, :description]

  include Elasticsearch::Model::Globalize::MultipleFields

  mapping do
    indexes :name_ko, analyzer: "ngram_analyzer"
    indexes :name_en, analyzer: "ngram_analyzer"
  end

  has_many :category_products, dependent: :destroy
  has_many :categories, through: :category_products
  has_many :variations, inverse_of: :product, dependent: :destroy
  has_many :order_products, through: :variations
  has_many :variation_options, inverse_of: :product, dependent: :destroy
  has_many :variation_option_values, through: :variation_options
  has_many :product_tags, dependent: :destroy
  has_many :tags, through: :product_tags
  has_many :product_images, dependent: :destroy
  has_one :master, ->{where master: true}, class_name: "Variation"
  has_one :seo_tag, as: :seoable, dependent: :destroy
  has_many :menu_items, foreign_key: "value", dependent: :destroy

  validates :name, translation_presence: true, translation_uniqueness: true
  validates :price, presence: true, numericality: {minimum: 0, allow_blank: true}

  I18n.available_locales.each do |locale|
    validates "name_#{locale}", length: {minimum: 2}, allow_blank: true
  end

  accepts_nested_attributes_for :variations, allow_destroy: true
  accepts_nested_attributes_for :variation_options, allow_destroy: true, reject_if: proc {|a| a[:name].blank?}
  accepts_nested_attributes_for :product_images, allow_destroy: true, reject_if: :all_blank
  accepts_nested_attributes_for :seo_tag, allow_destroy: false, reject_if: :all_blank

  scope :visible, ->{where visibility: true}
  scope :available, ->{where "in_stock > ?", 0}
  scope :featured, ->{where featured: true}
  scope :filtered_by_price, ->price_range{
    if price_range.present?
      start_price = price_range[0].to_f
      end_price = price_range[1].to_f

      if end_price > start_price
        joins(:variations).where("variations.price >= ? AND variations.price <= ?", start_price, end_price).uniq
      end
    end
  }
  scope :filtered_by_vendor, ->vendor_list{where(vendor: vendor_list) if vendor_list.present? && vendor_list.size > 0}
  scope :filtered_by_category, ->category_id{joins(:category_products).where("category_products.category_id = ?", category_id) if category_id.present?}
  scope :sorted_by, ->attribute, direction{
    if ["name", "price"].include?(attribute) && ["asc", "desc"].include?(direction)
      if attribute == "name"
        includes(:translations)
        .with_locales(I18n.available_locales)
        .order("product_translations.name #{direction}")
      else
        order "price #{direction}"
      end
    end
   }

  after_create :create_master
  after_update :update_master
  before_save :update_inventory
  before_save :ensure_default
  after_save { IndexerWorker.perform_async(:index, self.id, "Product", "Customer::ProductPresenter") }
  after_destroy { IndexerWorker.perform_async(:delete, self.id, "Product", "Customer::ProductPresenter") }

  def price=(price)
    price = price.to_s.gsub ",", ""
    self[:price] = price
  end

  def total_sale
    order_products.joins(:product_order).where("orders.status = ?", Order.statuses[:processed]).inject(0){|sum, x| sum + x.quantity}
  end

  def create_variations
    options = variation_options

    if options.size > 0 && variations.not_master.count == 0
      option_value_array = []
      options.each do |op|
        option_value_array << op.variation_option_values if op.variation_option_values.size > 0
      end

      if option_value_array.size == 0
        return false
      end

      option_value_array.first.product(*option_value_array[1..-1]).each do |a|
        variation = variations.build price: price, unlimited: unlimited

        a.each do |value|
          variation.variation_variation_option_values.build variation_option_value_id: value.id
        end

        unless variation.save
          return false
        end
      end
    end

    return true
  end

  def self.search_by_name query
    with_translations(:en).where "product_translations.name LIKE ?", "%#{query}%"
  end

  def self.search_fields
    %w{ name_ko^10 name_en^10 description_ko description_en }
  end

  private
  def ensure_default
    self.in_stock = 0 if in_stock.blank?
    self.sale_off = 0 if sale_off.blank?
    self.featured = false if featured.blank?
    self.unlimited = true if featured.blank?
  end

  def update_inventory
    unless variations.not_master.count == 0
      self.in_stock = variations.not_master.inject(0){|sum, x| sum + x.in_stock.to_i}
    end
  end

  def update_master
    master.save! if master
  end
end
