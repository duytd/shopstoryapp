# == Schema Information
#
# Table name: product_images
#
#  id         :integer          not null, primary key
#  featured   :boolean          default(FALSE)
#  image      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  product_id :integer
#
# Indexes
#
#  index_product_images_on_product_id  (product_id)
#
# Foreign Keys
#
#  fk_rails_...  (product_id => products.id)
#
class ProductImage < ApplicationRecord
  belongs_to :product
  before_update :ensure_only_one_image_is_active, if: Proc.new{|a| a.featured_changed? && a.featured?}

  validates :product, presence: true

  mount_uploader :image, ProductImageUploader

  default_scope {order created_at: :asc}

  def self.default_image
    {
      thumb: {
        url: ActionController::Base.helpers.asset_path("fallback/product/" + ["thumb", "default.jpg"].compact.join('_'))
      },
      url: ActionController::Base.helpers.asset_path("fallback/product/default.jpg")
    }
  end

  def self.featured images
    images.detect{|img| img.featured} || images[0] || default_image
  end

  def as_json options={}
    image.as_json.merge!({id: id, featured: featured})
  end

  def ensure_only_one_image_is_active
    product.product_images.where.not(id: self.id).update_all featured: false
  end
end
