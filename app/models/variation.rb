class Variation < ActiveRecord::Base
  mount_uploader :image, ProductImageUploader

  belongs_to :product, inverse_of: :variations
  has_many :order_products, dependent: :destroy
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
      master_image
    else
      image
    end
  end

  def master_image
    product.product_images.featured
  end

  def as_json options={}
    super.as_json(options).merge({
      name_ko: name_ko,
      name_en: name_en,
      variation_option_values: variation_variation_option_values,
      master_image: master_image,
      variation_image: variation_image,
      has_image: has_image?,
      product_slug: product.slug,
      values: variation_option_values.map{|v| v.id}
    })
  end

  private

  def has_image?
    image.present?
  end

  def initialize_master
    self.price = product.price
    self.sku = product.sku
    self.in_stock = product.in_stock
  end
end
