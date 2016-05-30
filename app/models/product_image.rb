class ProductImage < ActiveRecord::Base
  belongs_to :product
  before_update :ensure_only_one_image_is_active, if: Proc.new{|a| a.featured_changed? && a.featured?}

  validates :product, presence: true

  mount_uploader :image, ProductImageUploader

  default_scope {order created_at: :asc}

  def self.default_image
    {
      image: {
        thumb: {
          url: ActionController::Base.helpers.asset_path("fallback/product/" + ["thumb", "default.jpg"].compact.join('_'))
        },
        url: ActionController::Base.helpers.asset_path("fallback/product/default.jpg")
      }
    }
  end

  def self.featured
    where(featured: true).first || first || default_image
  end

  def as_json options={}
    super.as_json(options).merge({name: image.filename, url: image.thumb.url})
  end

  def ensure_only_one_image_is_active
    product.product_images.where.not(id: self.id).update_all featured: false
  end
end
