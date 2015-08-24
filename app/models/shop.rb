class Shop < ActiveRecord::Base
  belongs_to :theme
  belongs_to :plan
  belongs_to :merchant, foreign_key: "user_id"
  has_many :discounts, dependent: :destroy
  has_many :pages, dependent: :destroy
  has_many :menus, dependent: :destroy

  validates :merchant, presence: true
end
