# == Schema Information
#
# Table name: variation_variation_option_values
#
#  id                        :integer          not null, primary key
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#  variation_id              :integer
#  variation_option_value_id :integer
#
# Indexes
#
#  index_variation_variation_option_values_on_variation_id  (variation_id)
#  option_value_id                                          (variation_option_value_id)
#
# Foreign Keys
#
#  fk_rails_...  (variation_id => variations.id)
#  fk_rails_...  (variation_option_value_id => variation_option_values.id)
#
class VariationVariationOptionValue < ApplicationRecord
  belongs_to :variation, inverse_of: :variation_variation_option_values
  belongs_to :variation_option_value

  validates :variation, presence: true
  validates :variation_option_value, presence: true
  validates :variation_id, uniqueness: {scope: :variation_option_value_id}

  after_commit :delete_variation, on: :destroy

  def delete_variation
    unless variation.nil?
      variation.variation_option_values.delete_all
      variation.delete
    end
  end

  def as_json options={}
    super.as_json(options).merge({option_value: variation_option_value})
  end
end
