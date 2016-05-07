class Merchant < User
  attr_accessor :shop_name, :subdomain

  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable

  before_validation :generate_subdomain, on: :create, if: Proc.new {|a| a.email.present?}
  after_create :create_tenant, :create_merchant_shop

  has_one :shop, foreign_key: "user_id", dependent: :nullify
  has_one :theme, through: :shop
  has_one :subscription, foreign_key: :user_id, dependent: :destroy

  def has_subscription?
    subscription.present?
  end

  private
  def create_merchant_shop
    self.shop_name = if shop_name.empty? then Settings.shop.default_name else shop_name end
    self.create_shop name: shop_name, subdomain: subdomain, email: email
  end

  def create_tenant
    Apartment::Tenant.create subdomain
  end

  def generate_subdomain
    email_string = email.split("@").first.gsub /[^0-9a-z]/i, ""

    while Shop.exists? subdomain: email_string do
      email_string = email_string << Random.rand(100).to_s
    end

    self.subdomain = email_string
  end
end
