# == Schema Information
#
# Table name: category_products
#
#  id          :integer          not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  category_id :integer
#  product_id  :integer
#
# Indexes
#
#  index_category_products_on_category_id  (category_id)
#  index_category_products_on_product_id   (product_id)
#
# Foreign Keys
#
#  fk_rails_...  (category_id => categories.id)
#  fk_rails_...  (product_id => products.id)
#
class CategoryProduct < ApplicationRecord
  belongs_to :category, touch: true
  belongs_to :product

  validates :category_id, uniqueness: {scope: :product_id}
  validates :category, presence: true
  validates :product, presence: true
end
