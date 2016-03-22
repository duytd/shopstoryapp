class VariationOption < ActiveRecord::Base
  belongs_to :product, inverse_of: :variation_options
  has_many :variation_option_values, dependent: :destroy, inverse_of: :variation_option
  has_many :variation_variation_option_values, through: :variation_option_values

  validates :product, presence: true
  validates :name, presence: true

  accepts_nested_attributes_for :variation_option_values, allow_destroy: true,
    reject_if: proc {|a| a[:name].blank?}

  scope :relating_to_variations, ->{includes(:variation_variation_option_values).where.not(variation_variation_option_values: {id: nil})}

  def self.default_names
    %w{ color size material style }
  end

  def as_json options={}
    super.as_json(options).merge({option_values: variation_option_values})
  end
end
