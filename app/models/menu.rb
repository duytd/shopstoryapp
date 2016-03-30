class Menu < ActiveRecord::Base
  enum position: [:main, :footer]

  has_many :menu_items, dependent: :destroy
  accepts_nested_attributes_for :menu_items, allow_destroy: true

  validates :position, presence: true, uniqueness: true
end
