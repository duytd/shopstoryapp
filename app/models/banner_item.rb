# == Schema Information
#
# Table name: banner_items
#
#  id         :integer          not null, primary key
#  image      :string
#  link       :string
#  show_image :boolean
#  text       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  banner_id  :integer
#
# Indexes
#
#  index_banner_items_on_banner_id  (banner_id)
#
# Foreign Keys
#
#  fk_rails_...  (banner_id => banners.id)
#
class BannerItem < ApplicationRecord
  mount_uploader :image, BannerImageUploader

  belongs_to :banner, inverse_of: :banner_items

  validates :banner, presence: true
end
