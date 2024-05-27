class PaymentMethod < ApplicationRecord
  mount_uploader :image, PaymentMethodImageUploader
  validates :name, presence: true, uniqueness: true

  has_many :payment_method_options, dependent: :destroy
  has_many :payments, dependent: :nullify
  has_many :orders, through: :payments

  def as_json options={}
    super.as_json(options).merge({
      payment_method_options: payment_method_options,
      type: type.underscore
    })
  end

  def total_sale
    orders.success.count
  end
end
