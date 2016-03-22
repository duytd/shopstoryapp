class ProductOrder < Order
  belongs_to :customer
  has_many :order_products, foreign_key: "order_id", dependent: :destroy
  has_many :products, through: :order_products
  has_one :shipping_address, foreign_key: "order_id", dependent: :destroy
  has_one :billing_address, foreign_key: "order_id", dependent: :destroy

  before_save :summarize
  before_save :update_inventory, if: :order_processed?

  accepts_nested_attributes_for :shipping_address, reject_if: :all_blank
  accepts_nested_attributes_for :billing_address, reject_if: :all_blank

  attr_accessor :current_step

  def current_step
    @current_step || steps.first
  end

  def next_step
    @current_step = steps[steps.index(current_step)+1]
  end

  def last_step?
    current_step == steps.last
  end

  def as_json options={}
    super.as_json(options).merge({current_step: current_step,
      shipping_address: shipping_address, billing_address: billing_address,
      payment: payment, order_products: order_products})
  end

  private
  def update_inventory
    order_products.each do |order_product|
      variation = order_product.variation
      variation.update_attributes in_stock: (variation.in_stock - order_product.quantity)
    end
  end

  def summarize
    self.subtotal = order_products.inject(0){|sum, item| sum + (item.quantity * item.unit_price)}
    self.total = subtotal + shipping + tax
  end

  def steps
    %w( shipping billing )
  end
end
