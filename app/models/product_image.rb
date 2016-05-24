class ProductImage < ActiveRecord::Base
  belongs_to :product
  before_update :deactivate_relatives

  validates :product, presence: true

  mount_uploader :image, ProductImageUploader

  default_scope {order created_at: :asc}

  def self.featured
    where(featured: true).first || first
  end

  def as_json options={}
    super.as_json(options).merge({name: image.filename, url: image.thumb.url})
  end

  def deactivate_relatives
    product.product_images.where.not(id: self.id).update_all(featured: false) if self.featured && self.featured_changed?
  end
end
