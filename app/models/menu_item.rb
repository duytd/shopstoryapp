class MenuItem < ActiveRecord::Base
  belongs_to :menu

  translates :name

  globalize_accessors locales: [:en, :ko], attributes: [:name]

  acts_as_tree order: "name"

  validates :menu, presence: true
  validates :name, translation_presence: true

  scope :is_parent, ->{where parent_id: nil}
  default_scope {order position: :asc}

  def self.types
    %w{ home category page product url }
  end

  def as_json options={}
    super(options).merge({name_en: name_en, name_ko: name_ko, children: children})
  end
end