class Asset < ActiveRecord::Base
  belongs_to :theme

  validates :theme_id, presence: true
  validates :name, presence: true, uniqueness: {scope: :theme_id}

  scope :filter_by_theme, ->theme{where theme_id: theme.id}

  def as_json options={}
    super(options).merge({type: type.underscore})
  end
end
