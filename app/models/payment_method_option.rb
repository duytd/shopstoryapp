# == Schema Information
#
# Table name: public.payment_method_options
#
#  id                :integer          not null, primary key
#  default_value     :string           default("")
#  name              :string
#  option_type       :string
#  title             :string
#  value             :string           default("")
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  payment_method_id :integer
#
# Indexes
#
#  index_payment_method_options_on_payment_method_id  (payment_method_id)
#
# Foreign Keys
#
#  fk_rails_...  (payment_method_id => payment_methods.id)
#
class PaymentMethodOption < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: {scope: :payment_method_id}

  belongs_to :payment_method
  has_many :payment_method_option_shops
  has_many :payments
end
