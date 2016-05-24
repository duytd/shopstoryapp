class VariationVariationOptionValue < ActiveRecord::Base
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
