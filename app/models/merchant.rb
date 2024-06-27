# == Schema Information
#
# Table name: public.users
#
#  id                     :integer          not null, primary key
#  address                :string
#  city                   :string
#  company                :string
#  country                :string
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :string
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  first_name             :string
#  free                   :boolean          default(FALSE)
#  last_name              :string
#  last_sign_in_at        :datetime
#  last_sign_in_ip        :string
#  locale                 :string
#  phone                  :string
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  setup_step             :integer          default("provide_business_info")
#  sign_in_count          :integer          default(0), not null
#  type                   :string
#  zip_code               :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  stripe_id              :string
#
# Indexes
#
#  index_users_on_email                 (email)
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
class Merchant < User
  attr_accessor :shop_name, :subdomain
  enum setup_step: [:provide_business_info, :generate_sample_data, :done]

  devise :database_authenticatable, :validatable, :registerable, :recoverable, :rememberable, :trackable

  has_one :shop, foreign_key: "user_id", dependent: :nullify
  has_one :theme, through: :shop
  has_one :subscription, foreign_key: :user_id, dependent: :destroy

  validates :shop_name, format: {
    with: %r{\A[a-z](?:[a-z0-9-]*[a-z0-9])?\z}i, message: "is not valid"
  }, length: { in: 1..63 }, on: :create

  validates :setup_step, inclusion: {in: %w(provide_business_info generate_sample_data done)}, allow_blank: true

  def has_active_subscription?
    subscription&.active
  end

  def next_setup_step!
    current_index = Merchant.setup_steps[setup_step]
    next_index = current_index + 1
    next_step = Merchant.setup_steps.key(next_index)
    self.update_attributes!(setup_step: next_step) unless next_step.nil?
  end
end
