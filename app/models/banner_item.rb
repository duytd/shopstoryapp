class BannerItem < ActiveRecord::Base
  mount_uploader :image, BannerImageUploader

  belongs_to :banner, inverse_of: :banner_items

  validates :banner, presence: true
end
