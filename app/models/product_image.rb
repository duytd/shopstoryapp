class ProductImage < ActiveRecord::Base
  belongs_to :product
  before_update :deactivate_relatives

  validates :product, presence: true

  mount_uploader :image, ProductImageUploader

  default_scope {order created_at: :asc}

  def self.default_image
    {
      image: {
        thumb: {
          url: ActionController::Base.helpers.asset_path("fallback/product/" + ["thumb", "default.jpg"].compact.join('_'))
        },
        url: ActionController::Base.helpers.asset_path("fallback/product/" + ["", "default.jpg"].compact.join('_'))
      }
    }
  end

  def self.featured
    where(featured: true).first || first || default_image
  end

  def as_json options={}
    super.as_json(options).merge({name: image.filename, url: image.thumb.url})
  end

  def deactivate_relatives
    product.product_images.where.not(id: self.id).update_all(featured: false) if self.featured && self.featured_changed?
  end
end
