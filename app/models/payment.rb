# == Schema Information
#
# Table name: payments
#
#  id                 :integer          not null, primary key
#  amount             :decimal(, )      default(0.0)
#  extra_data         :jsonb
#  paid_at            :string
#  paypal_token       :string
#  state              :integer          default("pending")
#  submethod          :string
#  transaction_number :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  order_id           :integer
#  payer_id           :string
#  payment_method_id  :integer
#
# Indexes
#
#  index_payments_on_order_id           (order_id)
#  index_payments_on_payment_method_id  (payment_method_id)
#
# Foreign Keys
#
#  fk_rails_...  (order_id => orders.id)
#
class Payment < ApplicationRecord
  belongs_to :order, touch: true

  belongs_to :payment_method

  enum state: [:pending, :paid, :refunded]

  validates :order, presence: true
  validates :payment_method, presence: true
  validates :state, inclusion: {in: %w(pending paid refunded)}

  before_save :ensure_submethod

  def as_json options={}
    super.as_json(options).merge({payment_method: payment_method})
  end

  def paid!
    change_state "paid"
  end

  def refunded
    change_state "refunded"
  end

  def save_transaction options={}
    self.update_attributes({transaction_number: options[:transaction_number],
      extra_data: options[:extra_data], submethod: options[:submethod]}.reject{|k, v| v.blank?})
  end

  private
  def change_state state
    self.update_attributes state: state
  end

  def ensure_submethod
    self.submethod = submethod.try :downcase
  end
end
