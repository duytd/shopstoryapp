class Shipping::FreeShipping < ShippingRate
  def self.calculate order
    return 0
  end
end
