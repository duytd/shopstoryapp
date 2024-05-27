class ProductTag < ApplicationRecord
  belongs_to :product
  belongs_to :tag

  validates :product_id, uniqueness: {scope: :tag_id}
  validates :tag, presence: true
  validates :product, presence: true
end
