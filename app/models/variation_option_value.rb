# == Schema Information
#
# Table name: variation_option_values
#
#  id                  :integer          not null, primary key
#  name                :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  variation_option_id :integer
#
# Indexes
#
#  index_variation_option_values_on_variation_option_id  (variation_option_id)
#
# Foreign Keys
#
#  fk_rails_...  (variation_option_id => variation_options.id)
#
class VariationOptionValue < ApplicationRecord
  belongs_to :variation_option, inverse_of: :variation_option_values

  validates :variation_option, presence: true
  validates :name, presence: true

  has_many :variation_variation_option_values, dependent: :destroy

  scope :relating_to_variations, ->{includes(:variation_variation_option_values).where.not(variation_variation_option_values: {id: nil})}
end
