class Extension < ActiveRecord::Base
  has_many :shop_extensions

  validates :title, presence: true
  validates :name, uniqueness: true, presence: true
end
