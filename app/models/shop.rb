class Shop < ActiveRecord::Base
  translates :street
  globalize_accessors locales: [:en, :ko], attributes: [:street]

  mount_uploader :logo, LogoUploader

  belongs_to :theme
  belongs_to :merchant, foreign_key: "user_id"
  has_many :discounts, dependent: :destroy
  has_many :pages, dependent: :destroy
  has_many :menus, dependent: :destroy
  has_many :assets, dependent: :destroy
  has_many :payment_method_shops
  has_many :payment_methods, through: :payment_method_shops
  belongs_to :term, class_name: "CustomPage", foreign_key: "term_id"
  belongs_to :privacy, class_name: "CustomPage", foreign_key: "privacy_id"

  validates :name, presence: true
  validates :merchant, presence: true
  validates :theme, presence: true
  validates :email, presence: true, on: :update
  validates :email, format: {with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i}, allow_blank: true
  validates :subdomain, presence: true, format: {with: /\A[a-zA-Z0-9]+\Z/},
    uniqueness: true

  before_validation :set_default_values, on: :create
  before_create :generate_api_key
  after_create :set_assets
  after_create :load_payment_methods

  enum weight_unit: [:kg, :g]

  scope :current,->subdomain {find_by subdomain: subdomain}

  def as_json options={}
    super(options).merge({street_en: street_en, street_ko: street_ko})
  end

  def set_default_values
    self.theme = Theme.default
    self.currency = Settings.shop.default_currency
    self.time_zone = Settings.shop.default_timezone
    self.country = Settings.shop.default_country
  end

  def set_assets
    self.theme.import_asset self
  end

  def load_payment_methods
    PaymentMethod.all.each do |payment_method|
      payment_method_shop = self.payment_method_shops.find_or_create_by payment_method_id: payment_method.id

      payment_method.payment_method_options.each do |option|
        payment_method_shop.payment_method_option_shops.create payment_method_option_id: option.id
      end
    end
  end

  private
  def generate_api_key
    self.api_key = loop do
      random_key = SecureRandom.urlsafe_base64
      break random_key unless self.class.exists?(api_key: random_key)
    end
  end
end
