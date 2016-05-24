class Menu < ActiveRecord::Base
  enum position: [:main, :top_left, :top_right, :footer]

  has_many :menu_items, dependent: :destroy
  accepts_nested_attributes_for :menu_items, allow_destroy: true

  validates :position, presence: true, uniqueness: true
  validates :name, presence: true

  def self.with_position position
    find_by position: Menu.positions[position]
  end
end
