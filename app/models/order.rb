class Order < ActiveRecord::Base
  belongs_to :customer
  has_many :order_products, dependent: :destroy
  has_many :products, through: :order_products

  enum status: [:incomplete, :pending, :processed, :shipping, :shipped, :returned, :cancelled]
  enum payment_status: [:payment_pending, :payment_authorized, :paid, :refunded]

  before_create :generate_token
  #before_save :recalculate_attributes

  private
  def generate_token
    self.token = SecureRandom.urlsafe_base64
    generate_token if Order.exists? token: self.token
  end

  def recalculate_attributes
    items_in_cart = order_products
    self.quantity = item_in_carts.inject{|sum, item| sum + item.quantity}
    self.total = item_in_carts.inject{|sum, item| sum + (item.quantity * item.unit_price)}
  end
end
