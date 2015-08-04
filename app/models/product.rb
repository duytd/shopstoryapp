class Product < ActiveRecord::Base
  has_many :category_products, dependent: :destroy
  has_many :categories, through: :category_products
  has_many :variations
  has_many :product_tags, dependent: :destroy
  has_many :tags, through: :product_tags
  has_many :product_images, dependent: :destroy

  validates :name, presence: true, length: {minimum: 4}
  validates :description, presence: true, length: {minimum: 50}
  validates :price, presence: true, numericality: {minimum: 0}
end
