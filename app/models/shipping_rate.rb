class ShippingRate < ActiveRecord::Base
  translates :name

  globalize_accessors locales: [:en, :ko], attributes: [:name]

  has_many :product_shipping_rates, dependent: :destroy

  validates :type, presence: true, uniqueness: true
  validates :name, translation_presence: true

  def as_json options={}
    super(options).merge({
      type: type.underscore,
      name_ko: name_ko,
      name_en: name_en,
    })
  end

  def self.types
    %w{ free free_by_price flat_rate }
  end
end
