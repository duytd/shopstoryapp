class ProductImage < ActiveRecord::Base
  belongs_to :product
  after_save :deactivate_relatives, if: proc{|a| a.featured_changed?&& a.featured?}

  validates :product, presence: true

  mount_uploader :image, ProductImageUploader

  def self.featured
    where(featured: true).first || first
  end

  def as_json options={}
    super.as_json(options).merge({name: image.filename, url: image.thumb.url})
  end

  def deactivate_relatives

  end
end
