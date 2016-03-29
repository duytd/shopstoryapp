class OrderProduct < ActiveRecord::Base
  belongs_to :product_order, class_name: "ProductOrder", foreign_key: "order_id", touch: true
  belongs_to :variation

  validates :order_id, uniqueness: {scope: :variation_id}, on: :create
  validates :product_order, presence: true
  validates :variation, presence: true

  validate :quantity_must_be_less_than_variation_quantity_and_greater_than_zero

  before_create :initialize_unit_price
  after_save do
    product_order.save!
  end

  default_scope {order created_at: :asc}

  def as_json options={}
    super.as_json(options).merge({variation: variation})
  end

  private
  def quantity_must_be_less_than_variation_quantity_and_greater_than_zero
    errors.add(:quantity, I18n.t("activerecord.errors.messages.out_of_order")) if quantity > variation.in_stock || quantity <= 0
  end

  def initialize_unit_price
    self.unit_price = variation.price
  end
end
