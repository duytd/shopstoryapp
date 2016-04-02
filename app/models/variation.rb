class Variation < ActiveRecord::Base
  mount_uploader :image, ProductImageUploader

  belongs_to :product, inverse_of: :variations
  has_many :order_products, dependent: :nullify
  has_many :variation_variation_option_values, dependent: :destroy, inverse_of: :variation
  has_many :variation_option_values, through: :variation_variation_option_values

  accepts_nested_attributes_for :variation_variation_option_values, allow_destroy: true, reject_if: proc {|a| a[:variation_option_value_id].blank?}

  validates :product, presence: true
  validates :price, presence: true

  before_validation :initialize_master, if: :master?

  default_scope { order created_at: :asc }
  scope :not_master, -> {where master: false}

  def price=(price)
    price = price.to_s.gsub ",", ""
    self[:price] = price
  end

  def name
    if master?
      product.name
    else
      "#{product.name} (#{variation_variation_option_values.map{|v| v.variation_option_value.name}.join(',')})"
    end
  end

  def master_image
    product.product_images.featured
  end

  def as_json options={}
    super.as_json(options).merge({
      name: name,
      variation_option_values: variation_variation_option_values,
      master_image: master_image,
      has_image: has_image?,
      values: variation_option_values.map{|v| v.id}
    })
  end

  private
  def initialize_master
    self.price = product.price
    self.sku = product.sku
    self.in_stock = product.in_stock
  end

  def has_image?
    image.present?
  end
end
