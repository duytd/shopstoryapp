class SeoTag < ActiveRecord::Base
  belongs_to :seoable, polymorphic: true

  translates :title, :meta_description, :meta_keywords
  globalize_accessors locales: [:en, :ko], attributes: [:title, :meta_description, :meta_keywords]

  validates :title, translation_length: {maximum: 70}
  validates :meta_description, translation_length: {maximum: 160}
  validates :meta_keywords, translation_length: {maximum: 255}

  default_scope {includes :translations}

  def as_json options={}
    super(options).merge({
      title_ko: title_ko,
      title_en: title_en,
      meta_description_ko: meta_description_ko,
      meta_description_en: meta_description_en,
      meta_keywords_ko: meta_description_ko,
      meta_keywords_en: meta_description_en
    })
  end
end
