class Shipping::FlatRatePerProduct < ShippingRate
  validates :rate, presence: true, numericality: true

  def self.calculate order
    sum  = 0
    shipping_rate_object = first

    order.order_products.includes(:variation).each do |order_product|
      product = order_product.variation.product

      unless product.pay_shipping_on_delivery?
        unless product.flat_shipping_rate.blank?
          sum =  sum + product.flat_shipping_rate * order_product.quantity
        else
          sum =  sum + shipping_rate_object.rate * order_product.quantity unless shipping_rate_object.nil?
        end
      end
    end

    return sum
  end
end
