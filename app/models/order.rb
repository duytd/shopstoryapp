class Order < ActiveRecord::Base
  belongs_to :customer
  has_many :order_products, dependent: :destroy
  has_many :products, through: :order_products

  validates :customer, presence: true
end
