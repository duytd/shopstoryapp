class CustomPage < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, use: [:slugged, :finders]

  translates :title, :content

  globalize_accessors locales: [:en, :ko], attributes: [:title, :content]

  validates :title, translation_presence: true
  validates :content, translation_presence: true
  validates :slug, presence: true, uniqueness: true, on: :update
  has_one :seo_tag, as: :seoable, dependent: :destroy

  accepts_nested_attributes_for :seo_tag, allow_destroy: false, reject_if: :all_blank

  def as_json options={}
    super(options).merge({title_en: title_en, title_ko: title_ko})
  end
end
