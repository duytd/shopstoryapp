require "rt"

class Template < ActiveRecord::Base
  belongs_to :theme

  validates :theme, presence: true
  validates :name, presence: true, uniqueness: {scope: :theme_id}

  before_save :transform, if: :content_changed?

  scope :filter_by_theme, ->theme{where theme_id: theme.id}

  def self.update_bundle bundle
    bundle.template = Template.all.map{|x| x.transformed_content}.join(" ")
    bundle.save!
  end

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
    self.transformed_content = Rt.transform(self.content, {modules: "none", name: "#{self.name}RT"})
  end
end
