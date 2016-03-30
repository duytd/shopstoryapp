class MenuItem < ActiveRecord::Base
  belongs_to :menu

  translates :name

  globalize_accessors locales: [:en, :ko], attributes: [:name]

  validates :name, translation_presence: true
  validates :value, presence: true

  def self.types
    %w{ home category page product url }
  end
end
