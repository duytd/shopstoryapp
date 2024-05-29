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
class Shipping::FlatRatePerOrder < ShippingRate
  validates :rate, presence: true, numericality: true

  def self.calculate order
    return first.rate
  end
end
