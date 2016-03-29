class Shipping::FlatRatePerProduct < ShippingRate
  validates :rate, presence: true, numericality: true
end
