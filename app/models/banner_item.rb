class BannerItem < ActiveRecord::Base
  belongs_to :banner

  validates :banner, presence: true
end
