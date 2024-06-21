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

  before_validation :generate_subdomain, on: :create, if: Proc.new {|a| a.email.present?}
  after_create :create_merchant_shop!

  has_one :shop, foreign_key: "user_id", dependent: :nullify
  has_one :theme, through: :shop
  has_one :subscription, foreign_key: :user_id, dependent: :destroy

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

  private

  def create_merchant_shop!
    self.shop_name = if shop_name.empty? then Settings.shop.default_name else shop_name end
    self.create_shop! name: shop_name, subdomain: subdomain, email: email
  end

  def generate_subdomain
    email_string = email.split("@").first.gsub /[^0-9a-z]/i, ""

    while Shop.exists? subdomain: email_string do
      email_string = email_string << Random.rand(100).to_s
    end

    self.subdomain = email_string
  end
end
