class Asset < ActiveRecord::Base
  belongs_to :shop
  belongs_to :theme

  validates :shop_id, uniqueness: {scope: :theme_id}

  scope :with_theme, ->theme_id{find_by theme_id: theme_id}
end
