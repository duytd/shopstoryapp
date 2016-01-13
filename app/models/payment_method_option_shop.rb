class PaymentMethodOptionShop < ActiveRecord::Base
  belongs_to :payment_method_option
  belongs_to :payment_method_shop

  validates :payment_method_option, presence: true
  validates :payment_method_shop, presence: true
  validates_uniqueness_of :payment_method_option_id, scope: :payment_method_shop

  before_create :default_value

  scope :filter_by_parent, ->(payment_method_shop, payment_method_option){where(payment_method_shop_id: payment_method_shop.id,
    payment_method_option_id: payment_method_option.id)}

  private
  def default_value
    self.value = payment_method_option.default_value
  end
end