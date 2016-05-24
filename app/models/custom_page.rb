class CustomPage < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, use: [:slugged, :finders]

  translates :title, :content
  globalize_accessors locales: [:en, :ko], attributes: [:title, :content]

  include Searchable
  include Elasticsearch::Model::Globalize::MultipleFields
  mapping do
    indexes :title_en, analyzer: "ngram_analyzer"
    indexes :title_ko, analyzer: "ngram_analyzer"
  end

  has_one :seo_tag, as: :seoable, dependent: :destroy
  accepts_nested_attributes_for :seo_tag, allow_destroy: false, reject_if: :all_blank

  validates :title, translation_presence: true
  validates :content, translation_presence: true
  validates :slug, presence: true, uniqueness: true, on: :update

  before_destroy :destroy_menu_item
  after_save { IndexerWorker.perform_async(:index, self.id, "CustomPage", "Customer::CustomPagePresenter") }
  after_destroy { IndexerWorker.perform_async(:delete, self.id, "CustomPage", "Customer::CustomPagePresenter") }

  default_scope {includes(:translations).order created_at: :asc}

  def self.search_fields
    %w{ title_en^10 title_ko^10 content_en content_ko }
  end

  private
  def destroy_menu_item
    menu_items = Menu::Page.where value: id
    menu_items.destroy_all unless menu_items.empty?
  end
end
