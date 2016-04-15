require "rt"

class Template < ActiveRecord::Base
  belongs_to :theme

  validates :theme, presence: true
  validates :name, presence: true, uniqueness: {scope: :theme_id}

  def physical_path
    if root_directory?
      "templates/#{@template.name}.rt"
    else
      "templates/#{@template.directory}/#{@template.name}.rt"
    end
  end

  def self.bundle bundle
    bundle.template = Template.all.map{|x| Rt.transform(x.content, {modules: "none", name: "#{x.name}RT"})}.join(" ")
    bundle.save!
  end

  private
  def root_directory?
    directory == "templates"
  end
end
