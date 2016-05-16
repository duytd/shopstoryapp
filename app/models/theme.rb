require "rt"

class Theme < ActiveRecord::Base
  ROOT_DIR = "#{Rails.root}/app/assets/javascripts/customer/themes"
  mount_uploader :image, ThemeImageUploader

  has_many :shops
  has_many :theme_bundles, dependent: :nullify
  has_many :assets, dependent: :nullify

  scope :current, ->subdomain {joins(:shops)
    .where("shops.subdomain = ?", subdomain).first}

  validates :name, presence: true, uniqueness: true
  validates :directory, uniqueness: true

  def self.default
    find_by default: true
  end

  def install shop, options={}
    bundle = ThemeBundle.where(theme_id: id, shop_id: shop.id).first_or_initialize
    bundle.javascript = bundle_javascripts unless options[:javascript] == false
    bundle.stylesheet = bundle_stylesheets unless options[:stylesheet] == false
    bundle.locale = bundle_locales unless options[:locale] == false
    bundle.template = bundle_templates unless options[:template] == false
    bundle.save!
  end

  def self.theme_dirs
    Dir.entries(ROOT_DIR).reject{|dir_name| dir_name =~ /^\.{1,2}$/}
  end

  def self.get_theme_information dir
    settings = File.read "#{ROOT_DIR}/#{dir}/config/settings.json"
    JSON.parse settings
  end

  def read_file path
    File.read "#{ROOT_DIR}/#{directory}/#{path}"
  end

  private
  def bundle_locales
    locales = []
    locales_dir = "#{Rails.root}/app/assets/javascripts/customer/themes/#{directory}/locales"

    Dir.glob("#{locales_dir}/*.json") do |file|
      file_content = File.read file
      file_name = File.basename file

      asset = Asset::Locale.where(name: file_name, theme_id: id).first_or_create content: file_content
      locales << asset.content
    end

    "var I18n = I18n || {}; I18n.translations = {#{locales.join(",")}}"
  end

  def bundle_stylesheets
    content = ""
    stylesheets_dir = "#{Rails.root}/app/assets/javascripts/customer/themes/#{directory}/assets/stylesheets"

    Dir.glob("#{stylesheets_dir}/*.scss") do |file|
      file_content = File.read file
      file_name = File.basename file

      asset = Asset::Stylesheet.where(name: file_name, theme_id: id).first_or_create content: file_content
      content << asset.content
    end

    content
  end

  def bundle_javascripts
    content = ""
    javascripts_dir = "#{Rails.root}/app/assets/javascripts/customer/themes/#{directory}/assets/javascripts"

    Dir.glob("#{javascripts_dir}/*.js") do |file|
      file_content = File.read file
      file_name = File.basename file

      asset = Asset::Javascript.where(name: file_name, theme_id: id).first_or_create content: file_content
      content << asset.content
    end

    content
  end

  def bundle_templates
    content = ""
    templates_dir = "#{Rails.root}/app/assets/javascripts/customer/themes/#{directory}/templates"

    Dir.glob("#{templates_dir}/**/*.rt") do |file|
      file_content = File.read file
      file_name = File.basename file, ".*"
      file_directory = File.basename File.dirname(file)
      transformed_content = Rt.transform(file_content, {modules: "none", name: "#{file_name}RT"})

      template = Template.where(name: file_name, theme_id: id).first_or_create(
        content: file_content,
        directory: file_directory,
        transformed_content: transformed_content
      )

      content << template.transformed_content
    end

    content
  end
end
