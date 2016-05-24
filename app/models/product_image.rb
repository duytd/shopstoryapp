class ProductImage < ActiveRecord::Base
  belongs_to :product
  before_update :deactivate_relatives

  validates :product, presence: true

  mount_uploader :image, ProductImageUploader

  default_scope {order created_at: :asc}

  def self.featured
    where(featured: true).first || first || default_image
  end

  def as_json options={}
    super.as_json(options).merge({name: image.filename, url: image.thumb.url})
  end

  def default_image
    ActionController::Base.helpers.asset_path "fallback/product/" + [version_name, "default.png"].compact.join('_')
  end

  def deactivate_relatives
    product.product_images.where.not(id: self.id).update_all(featured: false) if self.featured && self.featured_changed?
  end
end
