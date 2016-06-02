class CustomerDiscount < ActiveRecord::Base
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
