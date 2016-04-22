class Shipping::FreeShippingByPrice < ShippingRate
  validates :min_price, presence: true, numericality: true

  def self.calculate order
    if order.subtotal > Shipping::FreeShippingByPrice.first.min_price
      return 0
    end
  end
end
