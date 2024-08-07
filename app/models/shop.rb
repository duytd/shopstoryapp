# == Schema Information
#
# Table name: public.shops
#
#  id                       :integer          not null, primary key
#  api_key                  :string
#  business_number          :string
#  ceo                      :string
#  city                     :string
#  country                  :string
#  currency                 :string
#  daum                     :string
#  domain                   :string
#  email                    :string
#  exchange_rate            :decimal(, )      default(1000.0)
#  facebook_url             :string
#  google_verification_code :string
#  instagram_url            :string
#  kakao                    :string
#  legal_name               :string
#  logo                     :string
#  meta_description         :text
#  meta_keywords            :text
#  meta_title               :string
#  name                     :string
#  naver                    :string
#  naver_verification_code  :string
#  online_retail_number     :string
#  phone                    :string
#  pinterest_url            :string
#  privacy_email            :string
#  privacy_manager          :string
#  service_phone            :string
#  street                   :string
#  subdomain                :string
#  time_zone                :string
#  weight_unit              :integer
#  yellow                   :string
#  zip_code                 :string
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  privacy_id               :integer
#  shop_id                  :integer          not null
#  term_id                  :integer
#  theme_id                 :integer
#  user_id                  :integer
#
# Indexes
#
#  index_shops_on_privacy_id  (privacy_id)
#  index_shops_on_term_id     (term_id)
#  index_shops_on_theme_id    (theme_id)
#  index_shops_on_user_id     (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (theme_id => themes.id)
#  fk_rails_...  (user_id => users.id)
#
class Shop < ApplicationRecord
  include LiquidMethods
  attr_accessor :setting_up

  translates :street
  globalize_accessors locales: [:en, :ko], attributes: [:street]

  mount_uploader :logo, LogoUploader

  belongs_to :theme
  belongs_to :merchant, foreign_key: "user_id"
  has_many :theme_bundles, dependent: :destroy
  has_many :payment_method_shops, dependent: :destroy
  has_many :payment_methods, through: :payment_method_shops
  belongs_to :term, class_name: "CustomPage", foreign_key: "term_id"
  belongs_to :privacy, class_name: "CustomPage", foreign_key: "privacy_id"

  validates :name, presence: true

  validates :merchant, presence: true
  validates :theme, presence: true
  validates :email, presence: true, on: :update
  validates :email, format: {with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i}, allow_blank: true
  validates :subdomain, presence: true, format: {with: %r{\A[a-z](?:[a-z0-9-]*[a-z0-9])?\z}i}, uniqueness: true
  validates :legal_name, presence: true, if: Proc.new{|a| a.setting_up && a.merchant.provide_business_info?}, on: :update

  before_validation :set_default_values, on: :create
  before_validation :strip_white_space
  before_create :generate_api_key
  before_create :create_tenant

  after_update :reconfigure_theme, if: :saved_change_to_theme_id?

  before_destroy :drop_tenant

  enum weight_unit: [:kg, :g]

  liquid_methods :name

  def set_default_values
    self.theme = Theme.get_default_theme
    self.currency = Settings.shop.default_currency
    self.time_zone = Settings.shop.default_timezone
    self.country = Settings.shop.default_country
  end

  def reconfigure_theme
    return if ThemeBundle.where(shop_id: id, theme_id: theme_id).present?

    # Create theme files
    Themes::CreateFiles.run!(shop: self, theme: theme)

    # Create theme bundles
    Themes::CreateBundles.run!(shop: self, theme: theme)
  end

  private

  def generate_api_key
    self.api_key = loop do
      random_key = SecureRandom.urlsafe_base64
      break random_key unless self.class.exists?(api_key: random_key)
    end
  end

  def strip_white_space
    self.domain = domain.strip unless domain.nil?
  end

  def drop_tenant
    Apartment::Tenant.drop subdomain
  end

  def create_tenant
    Apartment::Tenant.create subdomain
  end
end
