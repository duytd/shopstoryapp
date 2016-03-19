class VariationOptionValue < ActiveRecord::Base
  belongs_to :variation_option, inverse_of: :variation_option_values

  validates :variation_option, presence: true
  validates :name, presence: true

  has_many :variation_variation_option_values, dependent: :destroy
end
