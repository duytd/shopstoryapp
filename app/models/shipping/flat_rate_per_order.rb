class Shipping::FlatRatePerOrder < ShippingRate
  validates :rate, presence: true, numericality: true

  def self.calculate order
    return first.rate
  end
end
