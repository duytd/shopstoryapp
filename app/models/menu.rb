# == Schema Information
#
# Table name: menus
#
#  id         :integer          not null, primary key
#  active     :boolean          default(TRUE)
#  name       :string
#  position   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Menu < ApplicationRecord
  enum position: [:main, :footer]

  has_many :menu_items, dependent: :destroy
  accepts_nested_attributes_for :menu_items, allow_destroy: true

  validates :position, presence: true, uniqueness: true
  validates :name, presence: true

  def as_json options={}
    super(options).merge({menu_items: menu_items.is_parent})
  end

  def self.with_position position
    find_by position: Menu.positions[position]
  end
end
