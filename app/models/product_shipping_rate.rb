class ProductShippingRate < ActiveRecord::Base
  belongs_to :product
  belongs_to :shipping_rate

  validates :product, presence: true
  validates :shipping_rate, presence: true
end
