class Product < ActiveRecord::Base
  include Orderable

  translates :name, :description
  globalize_accessors locales: [:en, :ko], attributes: [:name, :description]

  has_many :category_products, dependent: :destroy
  has_many :categories, through: :category_products
  has_many :variations, inverse_of: :product, dependent: :destroy
  has_many :variation_options, inverse_of: :product, dependent: :destroy
  has_many :variation_option_values, through: :variation_options
  has_many :product_tags, dependent: :destroy
  has_many :tags, through: :product_tags
  has_many :product_images, dependent: :destroy
  has_one :master, ->{where master: true}, class_name: "Variation"

  validates :name, translation_presence: true, translation_uniqueness: true
  validates :price, presence: true, numericality: {minimum: 0, allow_blank: true}

  I18n.available_locales.each do |locale|
    validates "name_#{locale}", length: {minimum: 2}, allow_blank: true
  end

  accepts_nested_attributes_for :variations, allow_destroy: true
  accepts_nested_attributes_for :variation_options, allow_destroy: true,
    reject_if: proc {|a| a[:name].blank?}
  accepts_nested_attributes_for :product_images, allow_destroy: true,
    reject_if: proc {|a| a[:image].blank?}

  scope :visible, ->{where visibility: true}
  scope :available, ->{where "in_stock > ?", 0}

  after_create :create_master
  after_update :update_master
  before_save :update_inventory

  def name
    name_ko || name_en
  end

  def price=(price)
    price = price.to_s.gsub ",", ""
    self[:price] = price
  end

  def as_json options={}
    super.as_json(options).merge({name_en: name_en, name_ko: name_ko, images: product_images})
  end

  def create_variations
    options = variation_options.includes :variation_option_values

    begin
      if options.size > 0 && variations.not_master.count == 0
        option_value_array = options.map{|option| option.variation_option_values}
        option_value_array.first.product(*option_value_array[1..-1]).each do |a|
          variation = variations.build price: price

          a.each do |value|
            variation.variation_variation_option_values.build variation_option_value_id: value.id
          end

          variation.save!
        end
      end
    rescue Exception
      return false
    end
  end

  private
  def update_inventory
    unless variations.not_master.count == 0
      self.in_stock = variations.not_master.inject(0){|sum, x| sum + x.in_stock.to_i}
    end
  end

  def update_master
    master.save! if master
  end
end
