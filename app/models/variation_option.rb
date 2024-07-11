# == Schema Information
#
# Table name: variation_options
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  product_id :integer
#
# Indexes
#
#  index_variation_options_on_product_id  (product_id)
#
# Foreign Keys
#
#  fk_rails_...  (product_id => products.id)
#
class VariationOption < ApplicationRecord
  belongs_to :product, inverse_of: :variation_options
  has_many :variation_option_values, dependent: :destroy, inverse_of: :variation_option
  has_many :variation_variation_option_values, through: :variation_option_values

  validates :product, presence: true
  validates :name, presence: true

  accepts_nested_attributes_for :variation_option_values, allow_destroy: true,
    reject_if: proc {|a| a[:name].blank?}

  scope :relating_to_variations, ->{includes(:variation_variation_option_values).where.not(variation_variation_option_values: {id: nil})}

  validates :name, uniqueness: {scope: :product_id}

  def self.default_names
    %w{ color size material style }
  end

  def as_json options={}
    super.as_json(options).merge({option_values: variation_option_values})
  end
end
