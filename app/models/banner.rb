class Banner < ActiveRecord::Base
  has_many :banner_items, inverse_of: :banner, dependent: :destroy

  validates :name, presence: true

  accepts_nested_attributes_for :banner_items, allow_destroy: true, reject_if: :all_blank
end
