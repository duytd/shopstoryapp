class Discount < ActiveRecord::Base
  enum discount_type: [:percentage, :fixed_amount]

  has_many :orders, dependent: :nullify

  validates :code, presence: true
  validates :discount_type, presence: true, inclusion: {in: %w(percentage fixed_amount)}
  validates :start_date, presence: true
  validates :expiry_date, presence: true

  validate :start_date_must_greater_than_current_time, on: :create, if: Proc.new{|a| a.start_date.present?}
  validate :expiry_date_must_greater_than_start_date, if: Proc.new{|a| a.start_date.present? && a.expiry_date.present?}

  private
  def start_date_must_greater_than_current_time
    if start_date <= Date.today
      errors.add :start_date, :invalid
    end
  end

  def expiry_date_must_greater_than_start_date
    if expiry_date <= start_date
      errors.add :expiry_date, :invalid
    end
  end
end
