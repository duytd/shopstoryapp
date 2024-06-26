# == Schema Information
#
# Table name: addresses
#
#  id                :integer          not null, primary key
#  address1          :string
#  address2          :string
#  alternative_phone :string
#  city              :string
#  company           :string
#  country           :string
#  delivery_message  :text
#  email             :string
#  fax               :string
#  first_name        :string
#  last_name         :string
#  phone_number      :string
#  state             :string
#  type              :string
#  zip_code          :string
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  order_id          :integer
#
# Indexes
#
#  index_addresses_on_order_id  (order_id)
#
# Foreign Keys
#
#  fk_rails_...  (order_id => orders.id)
#
class Address < ApplicationRecord
  belongs_to :order

  validates :email, presence: true, format: {with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i}
  validates :first_name, presence: true
  validates :address1, presence: true
  validates :city, presence: true, unless: :korean_address?
  validates :state, presence: true, unless: :korean_address?
  validates :country, presence: true
  validates :phone_number, presence: true, numericality: {only_integer: true}, length: {in: 10..12}
  validates :alternative_phone, numericality: {only_integer: true}, length: {in: 10..12}, allow_blank: true
  validates :zip_code, presence: true
  validates :order, presence: true

  def korean_address?
    country == "KR"
  end
end
