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
  validate :default_cannot_be_unchecked, on: :update

  after_save :ensure_only_one_theme_is_default, if: Proc.new{|a| a.default_changed? && a.default?}

  def self.get_default_theme
    find_by default: true
  end

  def self.theme_dirs
    Dir.entries(ROOT_DIR).reject{|dir_name| dir_name =~ /^\.{1,2}$/}
  end

  def self.get_theme_information dir
    settings = File.read "#{ROOT_DIR}/#{dir}/config/settings.json"
    JSON.parse settings
  end

  def setup shop, options={}
    bundle = ThemeBundle.where(theme_id: id, shop_id: shop.id).first_or_initialize
    ThemeService.new({theme: self, bundle: bundle, options: options.merge({subdomain: shop.subdomain})}).create_bundle
  end

  def precompile options={}
    ThemeService.new({theme: self, options: options}).precompile
  end

  def read_file path
    File.read "#{ROOT_DIR}/#{directory}/#{path}"
  end

  private
  def default_cannot_be_unchecked
    if default_changed? && !default
      errors.add(:default, "cannot be uncheck")
    end
  end

  def ensure_only_one_theme_is_default
    Theme.where.not(id: self.id).update_all default: false
  end
end
