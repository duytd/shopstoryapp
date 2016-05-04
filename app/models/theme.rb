require "rt"

class Theme < ActiveRecord::Base
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

  def import_assets shop, options={}
    bundle = ThemeBundle.where(theme_id: id, shop_id: shop.id).first_or_initialize
    bundle.javascript = bundle_javascripts unless options[:javascript] == false
    bundle.stylesheet = bundle_stylesheets unless options[:stylesheet] == false
    bundle.locale = bundle_locales unless options[:locale] == false
    bundle.template = bundle_templates unless options[:template] == false
    bundle.save!
  end

  def read_file path
    root_dir = "#{Rails.root}/app/assets/javascripts/customer/themes"
    File.read "#{root_dir}/#{directory}/#{path}"
  end

  private
  def bundle_locales
    locales = []
    locales_dir = "#{Rails.root}/app/assets/javascripts/customer/themes/#{directory}/locales"

    Dir.glob("#{locales_dir}/*.json") do |file|
      file_content = File.read file
      file_name = File.basename file
      Asset::Locale.create content: file_content, name: file_name, theme_id: id
      locales << file_content
    end

    "var I18n = I18n || {}; I18n.translations = {#{locales.join(",")}}"
  end

  def bundle_stylesheets
    content = ""
    stylesheets_dir = "#{Rails.root}/app/assets/javascripts/customer/themes/#{directory}/assets/stylesheets"

    Dir.glob("#{stylesheets_dir}/*.scss") do |file|
      file_content = File.read file
      file_name = File.basename file
      Asset::Stylesheet.create content: file_content, name: file_name, theme_id: id

      content << file_content
    end

    content
  end

  def bundle_javascripts
    content = ""
    javascripts_dir = "#{Rails.root}/app/assets/javascripts/customer/themes/#{directory}/assets/javascripts"

    Dir.glob("#{javascripts_dir}/*.js") do |file|
      file_content = File.read file
      file_name = File.basename file
      Asset::Javascript.create content: file_content, name: file_name, theme_id: id

      content << file_content
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

      Template.create content: file_content, name: file_name, directory: file_directory, theme_id: id
      content << Rt.transform(file_content, {modules: "none", name: "#{file_name}RT"})
    end

    content
  end
end
