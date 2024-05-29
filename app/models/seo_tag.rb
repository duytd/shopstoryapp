# == Schema Information
#
# Table name: seo_tags
#
#  id               :integer          not null, primary key
#  meta_description :text
#  meta_keywords    :string
#  seoable_type     :string
#  title            :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  seoable_id       :integer
#
class SeoTag < ApplicationRecord
  belongs_to :seoable, polymorphic: true

  translates :title, :meta_description, :meta_keywords
  globalize_accessors locales: [:en, :ko], attributes: [:title, :meta_description, :meta_keywords]

  validates :title, translation_length: {maximum: 70}
  validates :meta_description, translation_length: {maximum: 160}
  validates :meta_keywords, translation_length: {maximum: 255}

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
