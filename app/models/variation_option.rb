class VariationOption < ActiveRecord::Base
  belongs_to :product

  def default_names
    %w{ color size style material }
  end
end
