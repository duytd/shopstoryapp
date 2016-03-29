class ShippingRate < ActiveRecord::Base
  translates :name

  globalize_accessors locales: [:en, :ko], attributes: [:name]

  validates :name, translation_presence: true
  validate :type_must_be_unique, on: :create

  def as_json options={}
    super(options).merge({
      type: type.underscore,
      name_ko: name_ko,
      name_en: name_en,
    })
  end

  def self.free
    find_by type: "Shipping::FreeShipping"
  end

  def self.free_by_price
    find_by type: "Shipping::FreeShippingByPrice"
  end

  def self.flat_rate_per_order
    find_by type: "Shipping::FlatRatePerOrder"
  end

  def self.flat_rate_per_product
    find_by type: "Shipping::FlatRatePerProduct"
  end

  def self.types
    %w{ free free_by_price flat_rate_per_order flat_rate_per_product }
  end

  def free_shipping_exists?
    Shipping::FreeShipping.exists? || Shipping::FreeShippingByPrice.exists?
  end

  def flat_rate_exists?
    Shipping::FlatRatePerOrder.exists? || Shipping::FlatRatePerProduct.exists?
  end

  def type_must_be_unique
    if type == "Shipping::FreeShipping" || type == "Shipping::FreeShippingByPrice"
      errors.add(:type, :free_shipping_taken) if free_shipping_exists?
    elsif type == "Shipping::FlatRatePerOrder" || type == "Shipping::FlatRatePerProduct"
      errors.add(:type, :flat_rate_taken) if flat_rate_exists?
    end
  end
end
