class Variation < ActiveRecord::Base
  mount_uploader :image, ProductImageUploader

  belongs_to :product, inverse_of: :variations
  has_many :order_products, dependent: :destroy
  has_many :variation_variation_option_values, dependent: :destroy, inverse_of: :variation
  has_many :variation_option_values, through: :variation_variation_option_values

  accepts_nested_attributes_for :variation_variation_option_values, allow_destroy: true, reject_if: proc {|a| a[:variation_option_value_id].blank?}

  validates :product, presence: true
  validates :price, presence: true
  validates :in_stock, presence: true, unless: :unlimited?

  before_validation :initialize_master, if: :master?

  default_scope { order created_at: :asc }
  scope :not_master, -> {where master: false}

  def price=(price)
    price = price.to_s.gsub ",", ""
    self[:price] = price
  end

  def final_price
    price - (price * product.sale_off / 100)
  end

  def name_en
    if master?
      product.name_en
    else
      "#{product.name_en} (#{variation_variation_option_values.map{|v| v.variation_option_value.name}.join(',')})"
    end
  end

  def name_ko
    if master?
      product.name_ko
    else
      "#{product.name_ko} (#{variation_variation_option_values.map{|v| v.variation_option_value.name}.join(',')})"
    end
  end

  def variation_image
    if master?
      ProductImage.featured(product.product_images)
    else
      image
    end
  end

  private
  def initialize_master
    self.price = product.price
    self.sku = product.sku
    self.in_stock = product.in_stock
    self.unlimited = product.unlimited
    true
  end
end
