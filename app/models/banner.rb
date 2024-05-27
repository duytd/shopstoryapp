class Banner < ApplicationRecord
  has_many :banner_items, inverse_of: :banner, dependent: :destroy
  accepts_nested_attributes_for :banner_items, allow_destroy: true, reject_if: :all_blank

  validates :name, presence: true
end
