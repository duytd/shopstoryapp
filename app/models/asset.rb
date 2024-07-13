# == Schema Information
#
# Table name: assets
#
#  id         :integer          not null, primary key
#  content    :text
#  directory  :string
#  image      :string
#  name       :string
#  type       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  theme_id   :integer
#
class Asset < ApplicationRecord
  TYPES_CLASSES_MAPPING = {
    javascript: "Asset::Javascript",
    stylesheet: "Asset::Stylesheet",
    locale: "Asset::Locale",
    image: "Asset::Image"
  }.freeze

  attr_accessor :theme_bundle

  after_save :update_theme_bundle, if: Proc.new{|a| a.saved_change_to_content? && a.theme_bundle.present?}

  belongs_to :theme

  validates :theme_id, presence: true, unless: Proc.new{|a| a.is_a?(Asset::Image) }
  validates :name, presence: true, uniqueness: {scope: :theme_id}, unless: Proc.new{|a| a.is_a?(Asset::Image) }

  scope :filter_by_theme, ->theme{where theme_id: theme.id}

  def self.types
    TYPES_CLASSES_MAPPING.keys
  end

  def self.type_class type
    TYPES_CLASSES_MAPPING.fetch(type.to_sym).constantize
  end
end
