class Shipping::FreeShippingByPrice < ShippingRate
  validates :min_price, presence: true, numericality: true
end
