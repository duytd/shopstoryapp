class Menu < ActiveRecord::Base
  enum position: [:main, :top_left, :top_right, :footer]

  has_many :menu_items, dependent: :destroy
  accepts_nested_attributes_for :menu_items, allow_destroy: true

  validates :position, presence: true, uniqueness: true
  validates :name, presence: true

  def as_json options={}
    super(options).merge({menu_items: menu_items.is_parent})
  end
end
