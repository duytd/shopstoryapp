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
class Menu::CategoryMenu < MenuItem
  validates :value, presence: true

  def url
    category = Category.find value
    customer_category_path category
  end
end
