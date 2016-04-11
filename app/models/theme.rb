class Theme < ActiveRecord::Base
  has_many :shops
  has_many :assets, dependent: :nullify

  scope :current, ->subdomain {joins(:shops)
    .where("shops.subdomain = ?", subdomain).first}

  validates :name, presence: true, uniqueness: true
  validates :directory, uniqueness: true

  def self.default
    find_by default: true
  end

  def import_asset shop
    asset = load_default_asset

    Asset.create theme_id: id, shop_id: shop.id,
      stylesheet: asset.stylesheet, javascript: asset.javascript,
      en_locale: asset.en_locale, ko_locale: asset.ko_locale
  end

  def load_default_asset
    javascript = load_default_file "javascript"
    stylesheet = load_default_file "stylesheet"
    en_locale = load_default_file "en_locale"
    ko_locale = load_default_file "ko_locale"

    Asset.new javascript: javascript, stylesheet: stylesheet,
      en_locale: en_locale, ko_locale: ko_locale
  end

  def load_default_file file
    path = map_file_path file
    read_file path
  end

  private
  def read_file path
    root_dir = "#{Rails.root}/app/assets/javascripts/customer/themes"
    File.read "#{root_dir}/#{directory}/#{path}"
  end

  def map_file_path file
    case file
    when "stylesheet"
      "assets/style.scss"
    when "javascript"
      "assets/shop.js"
    when "en_locale"
      "i18n/en.js"
    when "ko_locale"
      "i18n/ko.js"
    else
      nil
    end
  end
end
