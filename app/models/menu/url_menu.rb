# == Schema Information
#
# Table name: menu_items
#
#  id         :integer          not null, primary key
#  name       :string
#  position   :integer
#  type       :string
#  value      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  menu_id    :integer
#  parent_id  :integer
#
# Indexes
#
#  index_menu_items_on_menu_id  (menu_id)
#
# Foreign Keys
#
#  fk_rails_...  (menu_id => menus.id)
#
class Menu::UrlMenu < MenuItem
  validates :value, presence: true
  validates :value, format: { with: URI.regexp }, if: proc { |a| a.value.present? }

  def url
    value
  end
end
