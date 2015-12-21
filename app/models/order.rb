class Order < ActiveRecord::Base
  belongs_to :customer
  has_many :order_products, dependent: :destroy
  has_many :products, through: :order_products
  has_one :shipping_address, dependent: :destroy
  has_one :billing_address, dependent: :destroy
  has_one :payment, dependent: :nullify
  has_one :payment_method, through: :payment

  enum status: [:incomplete, :pending, :processing, :processed, :shipping, :shipped, :returned, :cancelled]

  before_create :generate_token
  before_save :summarize

  accepts_nested_attributes_for :shipping_address, reject_if: :all_blank
  accepts_nested_attributes_for :billing_address, reject_if: :all_blank
  accepts_nested_attributes_for :payment, reject_if: :all_blank

  default_scope {order created_at: :desc}

  attr_accessor :current_step

  def current_step
    @current_step || steps.first
  end

  def next_step
    self.current_step = steps[steps.index(current_step)+1]
  end

  def last_step?
    current_step == steps.last
  end

  def change_status status
    self.update_attributes status: status
  end

  def as_json options={}
    super.as_json(options).merge({current_step: current_step,
      shipping_address: shipping_address, billing_address: billing_address,
      payment: payment})
  end

  private
  def generate_token
    self.token = SecureRandom.urlsafe_base64
    generate_token if Order.exists? token: self.token
  end

  def summarize
    self.subtotal = order_products.inject(0){|sum, item| sum + (item.quantity * item.unit_price)}
    self.total = subtotal + shipping + tax
  end

  def steps
    %w[shipping billing processing_payment]
  end
end
