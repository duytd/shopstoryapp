class Payment < ActiveRecord::Base
  belongs_to :order, touch: true

  belongs_to :payment_method

  enum state: [:pending, :paid, :refunded]

  validates :order, presence: true

  def as_json options={}
    super.as_json(options).merge({payment_method: payment_method})
  end

  def paid!
    change_state "paid"
  end

  def refunded
    change_state "refunded"
  end

  def save_transaction_number transaction_number
    self.update_attributes transaction_number: transaction_number
  end

  def save_extra_data extra_data
    self.update_attributes extra_data: extra_data
  end

  private
  def change_state state
    self.update_attributes state: state
  end
end
