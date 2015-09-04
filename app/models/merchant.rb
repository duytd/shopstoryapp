class Merchant < User
  attr_accessor :shop_name
  
  before_validation :generate_subdomain, on: :create, if: :email
  after_create :create_merchant_shop, :create_tenant

  has_one :shop, foreign_key: "user_id"

  validates :subdomain, presence: true, format: {with: /\A[a-zA-Z0-9]+\Z/},
    uniqueness: true

  private
  def create_merchant_shop
    self.create_shop name: shop_name
  end

  def create_tenant
    Apartment::Tenant.create subdomain
  end

  def generate_subdomain
    email_string = email.split("@").first.gsub /[^0-9a-z]/i, ""

    while Merchant.exists? subdomain: email_string do
      email_string = email_string << Random.rand(100).to_s
    end

    self.subdomain = email_string
  end
end
