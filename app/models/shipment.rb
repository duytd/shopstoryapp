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
