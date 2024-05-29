# == Schema Information
#
# Table name: customer_discounts
#
#  id          :integer          not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  customer_id :integer
#  discount_id :integer
#  order_id    :integer
#
# Indexes
#
#  index_customer_discounts_on_customer_id  (customer_id)
#  index_customer_discounts_on_discount_id  (discount_id)
#  index_customer_discounts_on_order_id     (order_id)
#
# Foreign Keys
#
#  fk_rails_...  (customer_id => customers.id)
#  fk_rails_...  (discount_id => discounts.id)
#  fk_rails_...  (order_id => orders.id)
#
class CustomerDiscount < ApplicationRecord
  belongs_to :customer
  belongs_to :discount
  belongs_to :order

  validates :customer, presence: true
  validates :discount, presence: true
  validates :order, presence: true
  validates :order_id, uniqueness: true
  validates :discount_id, uniqueness: {scope: :customer_id}

  after_save do
    order.save!
  end
end
