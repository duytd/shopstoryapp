class Shop < ActiveRecord::Base
  translates :street
  globalize_accessors locales: [:en, :ko], attributes: [:street]

  belongs_to :theme
  belongs_to :plan
  belongs_to :merchant, foreign_key: "user_id"
  has_many :discounts, dependent: :destroy
  has_many :pages, dependent: :destroy
  has_many :menus, dependent: :destroy
  
  validates :name, presence: true
  validates :merchant, presence: true
  validates :plan, presence: true
  validates :theme, presence: true
  validates :email, presence: true, on: :update
  validates :email, format: {with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i}, allow_blank: true

  before_validation :load_defaults

  enum weight_unit: [:kg, :g]

  def as_json options={}
    super.as_json(options).merge({street_en: street_en, street_ko: street_ko})
  end

  private
  def load_defaults
    self.theme = Theme.default
    self.plan = Plan.default
  end
end
