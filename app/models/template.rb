require "rt"

class Template < ActiveRecord::Base
  attr_accessor :theme_bundle

  belongs_to :theme

  validates :theme, presence: true
  validates :name, presence: true, uniqueness: {scope: :theme_id}

  before_save :transform, if: :content_changed?

  scope :filter_by_theme, ->theme{where theme_id: theme.id}

  def path
    if root_directory?
      "templates/#{name}.rt"
    else
      "templates/#{directory}/#{name}.rt"
    end
  end

  private
  def root_directory?
    directory == "templates"
  end

  def transform
    self.transformed_content = Rt.transform(content, {modules: "none", name: "#{self.name}RT"})
    update_bundle if theme_bundle
  end

  def update_bundle
    theme_bundle.template = Template.filter_by_theme(theme).map do |x|
      (x.id == id) ? transformed_content : x.transformed_content
    end.join(" ")

    theme_bundle.save!
  end
end
