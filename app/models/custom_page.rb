class CustomPage < ApplicationRecord
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
  has_many :menu_items, foreign_key: "value", dependent: :destroy
  accepts_nested_attributes_for :seo_tag, allow_destroy: false, reject_if: :all_blank

  validates :title, translation_presence: true
  validates :content, translation_presence: true
  validates :slug, presence: true, uniqueness: true, on: :update

  after_save { IndexerWorker.perform_async(:index, self.id, "CustomPage", "Customer::CustomPagePresenter") }
  after_destroy { IndexerWorker.perform_async(:delete, self.id, "CustomPage", "Customer::CustomPagePresenter") }

  def self.search_fields
    %w{ title_en^10 title_ko^10 content_en content_ko }
  end
end
