class Customer < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable,
         :omniauthable, omniauth_providers: [:doindie]

  has_many :product_orders
  has_many :bookings, class_name: "ShopstoryTicket::Booking",
    dependent: :destroy, inverse_of: :customer

  attr_accessor :term, :privacy

  validates_acceptance_of :term, :privacy, allow_nil: false, on: :create

  enum gender: [:male, :female]

  liquid_methods :first_name, :last_name

  def self.from_omniauth auth
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.first_name = auth.info.name
      user.term = "1"
      user.privacy = "1"
    end
  end

  def total_orders
    product_orders.successful.count
  end

  def total_spent
    product_orders.successful.inject(0){|sum, item| sum + item.total}
  end
end
