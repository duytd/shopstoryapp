class PaymentMethod < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :payment_method_options, dependent: :destroy
  has_many :payments, dependent: :nullify

  def as_json options={}
    super.as_json(options).merge({payment_method_options: payment_method_options})
  end
end
