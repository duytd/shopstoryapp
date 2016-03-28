class Shipping::FlatRate < ShippingRate
  validates :rate, presence: true, numericality: true
end
