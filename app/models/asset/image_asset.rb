# == Schema Information
#
# Table name: assets
#
#  id         :integer          not null, primary key
#  content    :text
#  directory  :string
#  image      :string
#  name       :string
#  type       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  theme_id   :integer
#
class Asset::ImageAsset < Asset
end
