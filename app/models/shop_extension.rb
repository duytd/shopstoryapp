class ShopExtension < ActiveRecord::Base
  belongs_to :shop
  belongs_to :extension

  validates :shop, presence: true
  validates :extension, presence: true
  validates_uniqueness_of :shop_id, scope: :extension_id

  after_create :initialize_setting

  private
  def initialize_setting
    ("#{extension.name}".camelize + "::Setting").constantize.first_or_create
  end
end
