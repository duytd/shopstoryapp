class Customer < ActiveRecord::Base
  attr_accessor :term, :privacy
  enum gender: [:male, :female]

  liquid_methods :first_name, :last_name

  include Searchable
  mapping do
    indexes :email, analyzer: "ngram_analyzer"
    indexes :first_name, analyzer: "ngram_analyzer"
    indexes :last_name, analyzer: "ngram_analyzer"
    indexes :phone_number, analyzer: "ngram_analyzer"
  end

  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable, :omniauthable, omniauth_providers: [:doindie]

  has_many :product_orders
  has_many :customer_discounts, dependent: :destroy
  has_many :discounts, through: :customer_discounts
  has_many :discounted_orders, through: :customer_discounts, class_name: "Order", source: "order_id"

  validates_acceptance_of :term, :privacy, allow_nil: false, on: :create

  after_save { IndexerWorker.perform_async(:index, self.id, "Customer", "Customer::CustomerPresenter") }
  after_destroy { IndexerWorker.perform_async(:delete, self.id, "Customer", "Customer::CustomerPresenter") }

  def self.from_omniauth auth
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      user.first_name = auth.info.name
      user.term = "1"
      user.privacy = "1"
    end
  end

  def self.search_fields
    %w{ email^10 first_name^10 last_name phone_number }
  end

  def total_orders
    product_orders.success.count
  end

  def total_spent
    product_orders.success.inject(0){|sum, item| sum + item.total}
  end
end
