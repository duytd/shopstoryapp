class Asset < ActiveRecord::Base
  TYPES_CLASSES_MAPPING = {
    javascript: "Asset::Javascript",
    stylesheet: "Asset::Stylesheet",
    locale: "Asset::Locale",
    image: "Asset::Image"
  }.freeze

  attr_accessor :theme_bundle

  after_save :update_theme_bundle, if: Proc.new{|a| a.content_changed? && a.theme_bundle.present?}

  belongs_to :theme

  validates :theme_id, presence: true
  validates :name, presence: true, uniqueness: {scope: :theme_id}

  scope :filter_by_theme, ->theme{where theme_id: theme.id}

  def self.types
    TYPES_CLASSES_MAPPING.keys
  end

  def self.type_class type
    TYPES_CLASSES_MAPPING.fetch(type.to_sym).constantize
  end
end
