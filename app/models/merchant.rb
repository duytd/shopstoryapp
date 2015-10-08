class Merchant < User
  attr_accessor :shop_name, :subdomain

  before_validation :generate_subdomain, on: :create, if: Proc.new {|a| a.email.present?}
  after_create :create_merchant_shop, :create_tenant

  has_one :shop, foreign_key: "user_id"
  has_one :theme, through: :shop

  private
  def create_merchant_shop
    self.shop_name = if shop_name.empty? then Settings.shop.default_name else shop_name end
    self.create_shop name: shop_name, subdomain: subdomain
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
