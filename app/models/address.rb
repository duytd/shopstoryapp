class Address < ActiveRecord::Base
  belongs_to :product_order, class_name: "ProductOrder", foreign_key: "order_id"

  validates :email, presence: true, format: {with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i}
  validates :first_name, presence: true
  validates :address1, presence: true
  validates :city, presence: true, unless: :korean_address?
  validates :state, presence: true, unless: :korean_address?
  validates :country, presence: true
  validates :phone_number, presence: true, numericality: {only_integer: true}, length: {in: 10..12}
  validates :alternative_phone, numericality: {only_integer: true}, length: {in: 10..12}, allow_blank: true
  validates :zip_code, presence: true
  validates :product_order, presence: true

  def korean_address?
    country == "KR"
  end
end
