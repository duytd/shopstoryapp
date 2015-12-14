class Address < ActiveRecord::Base
  belongs_to :order

  validates :email, presence: true, format: {with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i}
  validates :first_name, presence: true
  validates :address1, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :country, presence: true
  validates :phone_number, presence: true
  validates :zip_code, presence: true
  validates :order, presence: true
end
