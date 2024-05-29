# == Schema Information
#
# Table name: product_tags
#
#  id         :integer          not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  product_id :integer
#  tag_id     :integer
#
# Indexes
#
#  index_product_tags_on_product_id  (product_id)
#  index_product_tags_on_tag_id      (tag_id)
#
# Foreign Keys
#
#  fk_rails_...  (product_id => products.id)
#  fk_rails_...  (tag_id => tags.id)
#
class ProductTag < ApplicationRecord
  belongs_to :product
  belongs_to :tag

  validates :product_id, uniqueness: {scope: :tag_id}
  validates :tag, presence: true
  validates :product, presence: true
end
