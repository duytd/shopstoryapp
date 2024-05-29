# == Schema Information
#
# Table name: order_products
#
#  id           :integer          not null, primary key
#  quantity     :integer
#  unit_price   :decimal(, )
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  order_id     :integer
#  variation_id :integer
#
# Indexes
#
#  index_order_products_on_order_id      (order_id)
#  index_order_products_on_variation_id  (variation_id)
#
# Foreign Keys
#
#  fk_rails_...  (order_id => orders.id)
#  fk_rails_...  (variation_id => variations.id)
#
class OrderProduct < ApplicationRecord
  belongs_to :product_order, class_name: "ProductOrder", foreign_key: "order_id"
  belongs_to :variation

  validates :order_id, uniqueness: {scope: :variation_id}, on: :create
  validates :product_order, presence: true
  validates :variation, presence: true

  validate :quantity_must_be_less_than_variation_quantity_and_greater_than_zero, unless: Proc.new{|a| a.variation.unlimited?}

  before_create :initialize_unit_price

  default_scope {order created_at: :asc}

  def as_json options={}
    super.as_json(options).merge({variation: variation})
  end

  private
  def quantity_must_be_less_than_variation_quantity_and_greater_than_zero
    errors.add(:quantity, I18n.t("activerecord.errors.messages.out_of_order")) if quantity > variation.in_stock || quantity <= 0
  end

  def initialize_unit_price
    self.unit_price = variation.final_price
  end
end
