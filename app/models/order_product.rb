class OrderProduct < ActiveRecord::Base
  belongs_to :order, touch: true
  belongs_to :product

  validates :order_id, uniqueness: {scope: :product_id}, on: :create
  validates :order, presence: true
  validates :product, presence: true

  validate :quantity_must_be_less_than_product_quantity_and_greater_than_zero

  before_create :initialize_unit_price

  default_scope {order created_at: :asc}

  def as_json options={}
    super.as_json(options).merge({product: product})
  end

  private
  def quantity_must_be_less_than_product_quantity_and_greater_than_zero
    errors.add(:quantity, I18n.t("activerecord.errors.messages.out_of_order")) if quantity > product.in_stock || quantity <= 0
  end

  def initialize_unit_price
    self.unit_price = product.price
  end
end
