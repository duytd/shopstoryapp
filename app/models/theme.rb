class Theme < ActiveRecord::Base
  has_many :shops
  has_many :theme_editors, dependent: :nullify

  scope :current, ->subdomain {joins(:shops)
    .where("shops.subdomain = ?", subdomain).first}

  validates :name, presence: true, uniqueness: true
  validates :directory, uniqueness: true

  def self.default
    find_by default: true
  end

  def import_theme_editor shop
    editor = load_default_theme_editor

    ThemeEditor.create theme_id: id, shop_id: shop.id,
      stylesheet: editor.stylesheet, javascript: editor.javascript,
      en_locale: editor.en_locale, ko_locale: editor.ko_locale
  end

  def load_default_theme_editor
    javascript = load_default_file "javascript"
    stylesheet = load_default_file "stylesheet"
    en_locale = load_default_file "en_locale"
    ko_locale = load_default_file "ko_locale"

    ThemeEditor.new javascript: javascript, stylesheet: stylesheet,
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
