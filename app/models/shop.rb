class Shop < ActiveRecord::Base
  belongs_to :theme
  belongs_to :plan
  belongs_to :user
  has_many :discounts, dependent: :destroy
  has_many :pages, dependent: :destroy
  has_many :menus, dependent: :destroy

  validates :theme, presence: true
  validates :plan, presence: true
  validates :user, presence: true
end
