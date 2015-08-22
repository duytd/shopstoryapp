class CategoryProduct < ActiveRecord::Base
  belongs_to :category
  belongs_to :product

  validates :category_id, uniqueness: {scope: :product_id}
  validates :category, presence: true
  validates :product, presence: true
end
