class MenuItem < ActiveRecord::Base
  belongs_to :menu

  translates :name

  globalize_accessors locales: [:en, :ko], attributes: [:name]

  acts_as_tree order: "name"

  validates :name, translation_presence: true
  validates :value, presence: true

  scope :is_parent, ->{where parent_id: nil}

  def self.types
    %w{ home category page product url }
  end

  def as_json
    super(options).merge({children: children})
  end
end
