class ProductOrder < Order
  belongs_to :customer
  has_many :order_products, foreign_key: "order_id", dependent: :destroy
  has_many :products, through: :order_products
  has_one :shipping_address, foreign_key: "order_id", dependent: :destroy
  has_one :billing_address, foreign_key: "order_id", dependent: :destroy
  has_one :shipment, foreign_key: "order_id", dependent: :destroy

  before_save :summarize, if: :checking_out?
  before_save :update_inventory, if: :changed_to_processed?
  before_save :update_paid_at, if: :changed_to_processed?

  accepts_nested_attributes_for :shipping_address, reject_if: :all_blank
  accepts_nested_attributes_for :billing_address, reject_if: :all_blank
  accepts_nested_attributes_for :shipment

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

  def flat_rate_overrode?
    order_products
      .joins(variation: :product)
      .where("products.flat_shipping_rate > 0").present?
  end

  def as_json options={}
    super.as_json(options).merge({
      current_step: current_step,
      shipping_address: shipping_address,
      billing_address: billing_address,
      payment: payment,
      shipment: shipment,
      order_products: order_products
    })
  end

  private
  def update_inventory
    order_products.each do |order_product|
      variation = order_product.variation
      remaining_quantity = variation.in_stock - order_product.quantity

      if variation.master?
          variation.product.update_attributes in_stock: remaining_quantity
      else
        variation.update_attributes in_stock: remaining_quantity
      end
    end
  end

  def summarize
    self.subtotal = calculate_subtotal
    self.shipping = calculate_shipping
    self.total = subtotal + shipping.to_f + tax
  end

  def calculate_subtotal
    self.subtotal = order_products.inject(0){|sum, item| sum + (item.quantity * item.unit_price)}
  end

  def calculate_shipping
    ShippingRate.calculate_price self
  end

  def update_paid_at
    self.paid_at = Time.zone.now
  end

  def steps
    %w( shipping billing )
  end
end
