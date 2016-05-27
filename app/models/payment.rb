class Payment < ActiveRecord::Base
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
