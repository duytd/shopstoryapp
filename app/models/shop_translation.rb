# == Schema Information
#
# Table name: shop_translations
#
#  id         :integer          not null, primary key
#  locale     :string           not null
#  street     :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  shop_id    :integer          not null
#
# Indexes
#
#  index_shop_translations_on_locale   (locale)
#  index_shop_translations_on_shop_id  (shop_id)
#
class ShopTranslation < ApplicationRecord
  belongs_to :shop
end
