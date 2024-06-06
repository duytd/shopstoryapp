# == Schema Information
#
# Table name: payment_method_option_shops
#
#  id                       :integer          not null, primary key
#  value                    :string
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  payment_method_option_id :integer
#  payment_method_shop_id   :integer
#
# Indexes
#
#  index_payment_method_option_shops_on_payment_method_option_id  (payment_method_option_id)
#  index_payment_method_option_shops_on_payment_method_shop_id    (payment_method_shop_id)
#
# Foreign Keys
#
#  fk_rails_...  (payment_method_option_id => payment_method_options.id)
#  fk_rails_...  (payment_method_shop_id => payment_method_shops.id)
#
class PaymentMethodOptionShop < ApplicationRecord
  belongs_to :payment_method_option
  belongs_to :payment_method_shop

  validates :payment_method_option, presence: true
  validates :payment_method_shop, presence: true
  validates_uniqueness_of :payment_method_option_id, scope: :payment_method_shop_id

  before_create :default_value

  scope :filter_by_parent, ->(payment_method_shop, payment_method_option){where(payment_method_shop_id: payment_method_shop.id,
    payment_method_option_id: payment_method_option.id)}
  default_scope {order created_at: :asc}

  def as_json options={}
    super.as_json(options).merge({
      payment_method_option: payment_method_option
    })
  end

  private
  def default_value
    self.value = payment_method_option.default_value
  end
end
