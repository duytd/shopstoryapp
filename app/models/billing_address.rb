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
class BillingAddress < Address
end
