# == Schema Information
#
# Table name: customers
#
#  id                     :integer          not null, primary key
#  access_token           :string
#  address                :string
#  city                   :string
#  country                :string
#  current_sign_in_at     :datetime
#  current_sign_in_ip     :inet
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  first_name             :string
#  gender                 :integer
#  last_name              :string
#  last_sign_in_at        :datetime
#  last_sign_in_ip        :inet
#  locale                 :string
#  phone                  :string
#  provider               :string
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  sign_in_count          :integer          default(0), not null
#  uid                    :string
#  zip_code               :string
#
# Indexes
#
#  index_customers_on_email                 (email) UNIQUE
#  index_customers_on_reset_password_token  (reset_password_token) UNIQUE
#
class Customer < ApplicationRecord
  include LiquidMethods
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

  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable, :omniauthable

  has_many :orders
  has_many :customer_discounts, dependent: :destroy
  has_many :discounts, through: :customer_discounts
  has_many :discounted_orders, through: :customer_discounts, class_name: "Order", source: "order_id"

  validates_acceptance_of :term, :privacy, allow_nil: false, on: :create

  after_save { IndexerWorker.perform_async(:index, self.id, "Customer", "Customer::CustomerPresenter") if Flipper.enabled?(:search) }
  after_destroy { IndexerWorker.perform_async(:delete, self.id, "Customer", "Customer::CustomerPresenter") if Flipper.enabled?(:search) }

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
    orders.success.count
  end

  def total_spent
    orders.success.inject(0){|sum, item| sum + item.total}
  end
end
