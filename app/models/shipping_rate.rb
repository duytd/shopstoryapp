class ShippingRate < ActiveRecord::Base

  # These types need to be arranged by priority
  TYPES_CLASSES_MAPPING = {
    free: Shipping::FreeShipping,
    free_by_price: Shipping::FreeShippingByPrice,
    flat_rate_per_order: Shipping::FlatRatePerOrder,
    flat_rate_per_product: Shipping::FlatRatePerProduct,
  }.freeze

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

  def self.type_class type
    TYPES_CLASSES_MAPPING.fetch(type.to_sym).new
  end

  def self.types
    TYPES_CLASSES_MAPPING.keys
  end

  def self.calculate_price order
    TYPES_CLASSES_MAPPING.values.each do |klass|
      if klass.exists?
        return klass.calculate(order)
      end
    end

    return 0
  end

  def free_shipping_exists?
    Shipping::FreeShipping.exists? || Shipping::FreeShippingByPrice.exists?
  end

  def flat_rate_exists?
    Shipping::FlatRatePerOrder.exists? || Shipping::FlatRatePerProduct.exists?
  end

  def type_must_be_unique
    if self.is_a?(Shipping::FreeShipping) || self.is_a?(Shipping::FreeShippingByPrice)
      errors.add(:type, :free_shipping_taken) if free_shipping_exists?
    elsif self.is_a?(Shipping::FlatRatePerOrder) || self.is_a?(Shipping::FlatRatePerProduct)
      errors.add(:type, :flat_rate_taken) if flat_rate_exists?
    end
  end
end
