class Customer < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, omniauth_providers: [:doindie]

  include ShopstoryTicket::Seller
  has_many :product_orders

  attr_accessor :term, :privacy

  validates_acceptance_of :term, :privacy, allow_nil: false

  def self.from_omniauth auth
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.first_name = auth.info.name
    end
  end
end
