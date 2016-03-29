class Shipping::FlatRatePerOrder < ShippingRate
  validates :rate, presence: true, numericality: true
end
