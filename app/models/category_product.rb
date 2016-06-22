class CategoryProduct < ActiveRecord::Base
  belongs_to :category, touch: true
  belongs_to :product

  validates :category_id, uniqueness: {scope: :product_id}
  validates :category, presence: true
  validates :product, presence: true
end
