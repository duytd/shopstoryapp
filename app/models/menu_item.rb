class MenuItem < ActiveRecord::Base
  TYPES_CLASSES_MAPPING = {
    home: "Menu::HomeMenu",
    category: "Menu::CategoryMenu",
    category_index: "Menu::CategoryIndexMenu",
    product_index: "Menu::ProductIndexMenu",
    custom_page: "Menu::CustomPageMenu",
    product: "Menu::ProductMenu",
    url: "Menu::UrlMenu"
  }.freeze

  include Rails.application.routes.url_helpers

  acts_as_tree order: "name"

  translates :name
  globalize_accessors locales: [:en, :ko], attributes: [:name]

  belongs_to :menu

  validates :menu, presence: true
  validates :name, translation_presence: true

  after_create :calculate_position

  scope :is_parent, ->{where parent_id: nil}

  def self.types
    TYPES_CLASSES_MAPPING.keys
  end

  def self.type_class type
    TYPES_CLASSES_MAPPING.fetch(type.to_sym).constantize.new
  end

  private
  def calculate_position
    unless parent.nil?
      self.update_attributes position: parent.children.count
    else
      self.update_attributes position: menu.menu_items.is_parent.count
    end
  end
end
