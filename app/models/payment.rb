class Payment < ActiveRecord::Base
  belongs_to :order, touch: true

  belongs_to :payment_method

  enum state: [:pending, :paid, :refunded]

  validates :order, presence: true

  def as_json options={}
    super.as_json(options).merge({payment_method: payment_method})
  end

  def change_state state
    self.update_attributes state: state
  end
end
