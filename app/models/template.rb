require "rt"

class Template < ActiveRecord::Base
  belongs_to :theme

  validates :theme, presence: true
  validates :name, presence: true, uniqueness: {scope: :theme_id}

  before_save :transform, if: :content_changed?

  def path
    if root_directory?
      "templates/#{name}.rt"
    else
      "templates/#{directory}/#{name}.rt"
    end
  end

  def self.update_bundle bundle
    bundle.template = Template.all.map{|x| x.transformed_content}.join(" ")
    bundle.save!
  end

  private
  def root_directory?
    directory == "templates"
  end

  def transform
    self.transformed_content = Rt.transform(self.content, {modules: "none", name: "#{self.name}RT"})
  end
end
