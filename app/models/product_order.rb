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
    self.total = subtotal + shipping + tax
  end

  def calculate_subtotal
    self.subtotal = order_products.inject(0){|sum, item| sum + (item.quantity * item.unit_price)}
  end

  def calculate_shipping
    if ShippingRate.free
      return free_shipping
    elsif ShippingRate.free_by_price
      if subtotal > ShippingRate.free_by_price.min_price
        return free_shipping
      end
    end

    if ShippingRate.flat_rate_per_order && !flat_rate_overrode?
      return shipping_fee_by_order
    else
      return shipping_fee_by_product
    end

    0
  end

  def flat_rate_overrode?
    order_products.includes(:variation).each do |order_product|
      product = order_product.variation.product

      unless product.flat_shipping_rate && product.flat_shipping_rate > 0
        return false
      end
    end

    true
  end

  def free_shipping
    0
  end

  def shipping_fee_by_order
    ShippingRate.flat_rate_per_order.rate
  end

  def shipping_fee_by_product
    sum  = 0
    default_rate = ShippingRate.flat_rate_per_product

    order_products.includes(:variation).each do |order_product|
      product = order_product.variation.product

      unless product.pay_shipping_on_delivery
        if product.flat_shipping_rate
          sum =  sum + product.flat_shipping_rate * order_product.quantity
        else
          sum =  sum + default_rate * order_product.quantity if default_rate
        end
      end
    end

    sum
  end

  def steps
    %w( shipping billing )
  end
end
