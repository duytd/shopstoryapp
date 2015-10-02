class Theme < ActiveRecord::Base
  has_many :shops
  has_many :theme_editors, dependent: :nullify

  scope :default, ->{find_by(default: true)}
  scope :current, ->subdomain {joins(:shops)
    .where("shops.subdomain = ?", subdomain).first}

  def import_theme_editor shop
    javascript = read_file "assets/shop.js"
    stylesheet = read_file "assets/style.scss"

    ThemeEditor.create theme_id: id, shop_id: shop.id,
      stylesheet: stylesheet, javascript: javascript
  end

  private
  def read_file path
    root_dir = "#{Rails.root}/app/assets/javascripts/customer/themes"
    File.read "#{root_dir}/#{directory}/#{path}"
  end
end
