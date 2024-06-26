# == Schema Information
#
# Table name: discounts
#
#  id            :integer          not null, primary key
#  active        :boolean          default(TRUE)
#  amount        :decimal(, )
#  code          :string
#  discount_type :integer
#  expiry_date   :date
#  start_date    :date
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Discount < ApplicationRecord
  enum discount_type: [:percentage, :fixed_amount]

  has_many :customer_discounts, dependent: :destroy
  has_many :customers, through: :customer_discounts
  has_many :orders, through: :customer_discounts

  validates :code, presence: true
  validates :amount, presence: true, numericality: true
  validates :discount_type, presence: true, inclusion: {in: %w(percentage fixed_amount)}
  validates :start_date, presence: true
  validates :expiry_date, presence: true
  validate :expiry_date_must_greater_than_start_date, if: Proc.new{|a| a.start_date.present? && a.expiry_date.present?}

  private
  def expiry_date_must_greater_than_start_date
    if expiry_date <= start_date
      errors.add :expiry_date, :invalid
    end
  end
end
