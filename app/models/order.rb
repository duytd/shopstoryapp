class Order < ActiveRecord::Base
  belongs_to :customer
  has_one :payment, dependent: :nullify
  has_one :payment_method, through: :payment

  enum status: [:incompleted, :pending, :processing, :processed, :shipping, :shipped, :returned, :cancelled]

  before_create :generate_token

  accepts_nested_attributes_for :payment, reject_if: :all_blank

  default_scope {order created_at: :desc}

  scope :having_payment, ->{where.not(status: [Order.statuses[:incompleted], Order.statuses[:pending], Order.statuses[:cancelled]])}

  after_initialize :set_default_values

  paginates_per Settings.paging.order

  def pending!
    update_status "pending"
  end

  def processing!
    update_status "processing"
  end

  def processed!
    update_status "processed"
  end

  def shipping!
    update_status "shipping"
  end

  def shipped!
    update_status "shipped"
  end

  def returned!
    update_status "returned"
  end

  def cancelled
    update_status "cancelled"
  end

  def in_usd attr, exchange_rate
    amount = send attr
    convert_to_usd amount, exchange_rate
  end

  def convert_to_usd amount, exchange_rate
    if currency.upcase == "KRW"
      MoneyConverter.krw_to_usd amount, exchange_rate
    else
      amount
    end
  end

  def update_currency currency
    self.update_attributes currency: currency
  end

  def as_json options={}
    super.as_json(options).merge({type: type.underscore})
  end

  protected
  def order_processed?
    status_changed? && self.processed?
  end

  def set_default_values
    self.currency ||= Settings.shop.default_currency
  end

  private
  def generate_token
    self.token = SecureRandom.urlsafe_base64
    generate_token if Order.exists? token: self.token
  end

  def update_status status
    self.update_attributes status: status
  end
end
