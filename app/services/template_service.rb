require "rt"

class TemplateService
  def initialize params
    @theme = params[:theme]
    @subdomain = params[:subdomain]
  end

  def get_compiled_code type
    content = ""

    Apartment::Tenant.reset
    templates = Template.where(theme_id: @theme.id)

    templates.each do |template|
      find_and_save_template! template.name, template.content, template.directory, template.transformed_content
      content << template.transformed_content
    end

    content
  end

  def create_bundle
    content = ""
    templates_dir = "#{Rails.root}/app/assets/javascripts/customer/themes/#{@theme.directory}/templates"

    Dir.glob("#{templates_dir}/**/*.rt") do |file|
      file_content = File.read file
      file_name = File.basename file, ".*"
      file_directory = File.basename File.dirname(file)
      transformed_content = Rt.transform(file_content, {modules: "none", name: "#{file_name}RT"})

      find_and_save_template! file_name, file_content, file_directory, transformed_content
      content << transformed_content
    end

    content
  end

  def find_and_save_template! file_name, file_content, file_directory, transformed_content
    Apartment::Tenant.switch @subdomain
    template = Template.where(name: file_name, theme_id: @theme.id).first_or_initialize
    template.content = file_content
    template.directory = file_directory
    template.transformed_content = transformed_content
    template.save!
  end
end
