class Variation < ActiveRecord::Base
  belongs_to :product, inverse_of: :variations

  has_many :variation_variation_option_values, dependent: :destroy, inverse_of: :variation
  accepts_nested_attributes_for :variation_variation_option_values, allow_destroy: true, reject_if: proc {|a| a[:variation_option_value_id].blank?}

  validates :product, presence: true
  validates :price, presence: true

  before_validation :initialize_master_price, if: :master?

  scope :not_master, -> {where master: false}

  def in_stock
    self[:in_stock] || product.in_stock
  end

  def image
    self[:image] || product.product_images.featured.try(:image)
  end

  def sku
    self[:sku] || product.sku
  end

  def initialize_master_price
    self.price = product.price
  end

  def as_json options={}
    super.as_json(options).merge({variation_option_values: variation_variation_option_values})
  end
end
