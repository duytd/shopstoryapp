# == Schema Information
#
# Table name: shipping_rates
#
#  id         :integer          not null, primary key
#  active     :boolean          default(FALSE)
#  min_price  :decimal(, )
#  name       :string
#  rate       :decimal(, )      default(0.0)
#  type       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Shipping::FreeShippingByPrice < ShippingRate
  validates :min_price, presence: true, numericality: true

  def self.calculate order
    if order.subtotal > Shipping::FreeShippingByPrice.first.min_price
      return 0
    end
  end
end
