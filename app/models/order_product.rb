class OrderProduct < ActiveRecord::Base
  belongs_to :order
  belongs_to :product

  validates :order_id, uniqueness: {scope: :product_id}
  validates :order, presence: true
  validates :product, presence: true
end
