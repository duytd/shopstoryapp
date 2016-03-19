class ProductImage < ActiveRecord::Base
  belongs_to :product

  validates :product, presence: true

  mount_uploader :image, ProductImageUploader

  scope :featured, ->{find_by(featured: true) || first}

  def as_json options={}
    super.as_json(options).merge({name: image.filename, url: image.thumb.url})
  end
end
