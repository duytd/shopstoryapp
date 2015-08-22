class Tag < ActiveRecord::Base
  has_many :product_tags, dependent: :destroy
  has_many :products, through: :product_tags

  validates :label, presence: true
end
