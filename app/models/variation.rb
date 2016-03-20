class Variation < ActiveRecord::Base
  mount_uploader :image, ProductImageUploader

  belongs_to :product, inverse_of: :variations
  has_many :variation_variation_option_values, dependent: :destroy, inverse_of: :variation

  accepts_nested_attributes_for :variation_variation_option_values, allow_destroy: true, reject_if: proc {|a| a[:variation_option_value_id].blank?}

  validates :product, presence: true
  validates :price, presence: true

  before_validation :initialize_master_price, if: :master?

  default_scope { order created_at: :asc }
  scope :not_master, -> {where master: false}

  def price=(price)
    price = price.to_s.gsub ",", ""
    self[:price] = price
  end

  def as_json options={}
    super.as_json(options).merge({variation_option_values: variation_variation_option_values, has_image: has_image?})
  end

  private
  def initialize_master_price
    self.price = product.price
  end

  def has_image?
    image.present?
  end
end
