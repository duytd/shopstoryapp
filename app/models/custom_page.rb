class CustomPage < ActiveRecord::Base
  extend FriendlyId
  include Searchable

  friendly_id :title, use: [:slugged, :finders]

  before_destroy :destroy_menu_item

  translates :title, :content
  globalize_accessors locales: [:en, :ko], attributes: [:title, :content]
  include Elasticsearch::Model::Globalize::MultipleFields

  validates :title, translation_presence: true
  validates :content, translation_presence: true
  validates :slug, presence: true, uniqueness: true, on: :update
  has_one :seo_tag, as: :seoable, dependent: :destroy

  accepts_nested_attributes_for :seo_tag, allow_destroy: false, reject_if: :all_blank

  mapping do
    indexes :title_en, analyzer: "ngram_analyzer"
    indexes :title_ko, analyzer: "ngram_analyzer"
  end

  def as_json options={}
    super(options).merge({title_en: title_en, title_ko: title_ko})
  end

  def self.search_fields
    %w{ title_en^10 title_ko^10 content_en content_ko }
  end

  private
  def destroy_menu_item
    menu_items = Menu::Page.where value: id
    menu_items.destroy_all unless menu_items.empty?
  end
end
