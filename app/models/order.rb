class Order < ActiveRecord::Base
  HOURLY_RANGE = 60 * 60
  DAILY_RANGE = 24 * HOURLY_RANGE
  WEEKLY_RANGE = 7 * DAILY_RANGE
  YEARLY_RANGE = 365 * DAILY_RANGE

  belongs_to :customer
  has_one :payment, dependent: :nullify
  has_one :payment_method, through: :payment
  has_one :shipment, dependent: :destroy
  has_one :shipping_method, through: :shipment
  has_one :customer_discount, dependent: :destroy
  has_one :discount, through: :customer_discount

  validates :status, inclusion: {in: %w(incompleted pending processing processed cancelled)}

  enum status: [:incompleted, :pending, :processing, :processed, :cancelled]

  before_create :generate_token
  before_save :set_locale
  before_save :set_order_time, if: Proc.new{|o| o}

  accepts_nested_attributes_for :payment, reject_if: :all_blank

  default_scope {order created_at: :desc}

 scope :latest, ->{order updated_at: :desc}
  scope :success, ->{where(status: [Order.statuses[:processed], Order.statuses[:shipping], Order.statuses[:shipped]])}
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

  def cancelled!
    update_status "cancelled"
  end

  def unprocessed?
    incompleted? || pending?
  end

  def add_discount discount, customer
    self.create_customer_discount discount_id: discount.id, customer_id: customer.id
  end

  def remove_discount
    self.customer_discount.destroy unless customer_discount.nil?
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

  protected
  def self.get_revenue time=nil
    if time.nil?
      self.success.sum(:total)
    else
      case time
      when "last_7_days"
        self.success.where("updated_at >= ? AND updated_at <= ?", 7.days.ago, Time.current).sum(:total)
      when "last_30_days"
        self.success.where("updated_at >= ? AND updated_at <= ?", 1.month.ago, Time.current).sum(:total)
      when "today"
        self.success.where("updated_at >= ? AND updated_at <= ?", Time.current.beginning_of_day, Time.current).sum(:total)
      end
    end
  end

  def self.get_sale time=nil
    if time.nil?
      self.success.count
    else
      case time
      when "last_7_days"
        self.success.where("updated_at >= ? AND updated_at <= ?", 7.days.ago, Time.current).count
      when "last_30_days"
        self.success.where("updated_at >= ? AND updated_at <= ?", 1.month.ago, Time.current).count
      when "today"
        self.success.where("updated_at >= ? AND updated_at <= ?", Time.current.beginning_of_day, Time.current).count
      end
    end
  end

  def self.hourly_data
    points = 24
    start_time = Time.current.at_beginning_of_day
    chart_data points, HOURLY_RANGE, true, start_time, "hourly"
  end

  def self.daily_data
    points = 30
    start_time = Time.current.at_beginning_of_month
    chart_data points, DAILY_RANGE, true, start_time, "daily"
  end

  def self.weekly_data
    points = 8
    start_time = Time.current.at_end_of_week - 7.weeks
    chart_data points, WEEKLY_RANGE, true, start_time, "weekly"
  end

  def self.monthly_data
    points = 12
    start_time = Time.current.at_beginning_of_year
    monthly_range = []
    temp = start_time

    12.times do
      end_time = temp.end_of_month
      monthly_range << end_time.day * DAILY_RANGE
      temp = end_time + 1.day
    end

    chart_data points, monthly_range, false, start_time, "monthly"
  end

  def self.yearly_data
    points = 4
    start_time = Time.current.at_end_of_year - 4.years
    chart_data points, YEARLY_RANGE, true, start_time, "yearly"
  end

  def self.chart_data points, range, same_range, start_time, time_type
    data = []
    start_time = start_time
    i = 0

    points.times do
      end_time = (same_range) ? (start_time + range) : (start_time + range[i])
      orders = self.success.where "updated_at >= ? AND updated_at <= ?", start_time, end_time
      data << {time: format_time(start_time, time_type), revenue: orders.inject(0){|sum, x| sum + x.total}}
      start_time = end_time
      i = i + 1
    end

    return data
  end

  def changed_to_processed?
    status_changed? && processed?
  end

  def checking_out?
    incompleted?
  end

  def set_default_values
    self.currency ||= Settings.shop.default_currency
  end

  private
  def set_locale
    self.locale = I18n.locale
  end

  def self.format_time(time, time_type)
    case time_type
    when "hourly"
      time.strftime("%H:00")
    when "monthly"
      time.strftime("%B")
    when "yearly"
      time.strftime("%Y")
    when "weekly"
      time.strftime("%m-%d")
    else
      time.strftime("%Y-%m-%d")
    end
  end

  def generate_token
    self.token = SecureRandom.urlsafe_base64
    generate_token if Order.exists? token: self.token
  end

  def update_status status
    self.update_attributes! status: status
  end
end
