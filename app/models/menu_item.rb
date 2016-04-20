class MenuItem < ActiveRecord::Base
  TYPES_CLASSES_MAPPING = {
    home: "Menu::Home",
    category: "Menu::Category",
    category_all: "Menu::CategoryAll",
    product_all: "Menu::ProductAll",
    page: "Menu::Page",
    product: "Menu::Product",
    url: "Menu::Url"
  }.freeze

  include Rails.application.routes.url_helpers

  belongs_to :menu

  translates :name

  globalize_accessors locales: [:en, :ko], attributes: [:name]

  acts_as_tree order: "name"

  validates :menu, presence: true
  validates :name, translation_presence: true

  scope :is_parent, ->{where parent_id: nil}
  default_scope {order position: :asc}

  after_create :calculate_position

  def self.types
    TYPES_CLASSES_MAPPING.keys
  end

  def self.type_class type
    TYPES_CLASSES_MAPPING.fetch(type.to_sym).constantize.new
  end

  def as_json options={}
    super(options).merge({
      name_en: name_en,
      name_ko: name_ko,
      children: children,
      type: type.underscore,
      url: url
    })
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
