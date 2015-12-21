class PaymentMethodOption < ActiveRecord::Base
  validates :name, presence: true
  validates :name, uniqueness: {scope: :payment_method_id}

  belongs_to :payment_method
  has_many :payment_method_option_shops
  has_many :payments
end
