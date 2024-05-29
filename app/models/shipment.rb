# == Schema Information
#
# Table name: shipments
#
#  id                 :integer          not null, primary key
#  status             :integer          default("shipping")
#  tracking_code      :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  order_id           :integer
#  shipping_method_id :integer
#
# Indexes
#
#  index_shipments_on_order_id            (order_id)
#  index_shipments_on_shipping_method_id  (shipping_method_id)
#
# Foreign Keys
#
#  fk_rails_...  (order_id => orders.id)
#
class Shipment < ApplicationRecord
  enum status: [:shipping, :shipped, :returned]

  belongs_to :product_order, foreign_key: "order_id"
  belongs_to :shipping_method

  after_save :cancel_order, if: Proc.new{|a| a.status_changed? && a.returned?}

  validates :shipping_method_id, presence: true
  validates :status, inclusion: {in: %w(shipping shipped returned)}

  def cancel_order
    self.product_order.cancelled!
  end
end
