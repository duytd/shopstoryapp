class CustomPage < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, use: :slugged

  translates :title, :content

  globalize_accessors locales: [:en, :ko], attributes: [:title, :content]

  validates :title, translation_presence: true
  validates :content, translation_presence: true
  validates :slug, presence: true, uniqueness: true, on: :update

  def as_json options={}
    super.as_json(options).merge({title_en: title_en})
  end
end
