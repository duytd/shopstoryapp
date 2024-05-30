require "rt"

class TemplateService
  def initialize params
    @theme = params[:theme]
    @subdomain = params[:subdomain]
  end

  def get_compiled_code type
    content = ""

    Apartment::Tenant.reset
    compiled_templates = Template.where(theme_id: @theme.id)
    tenant_templates = []

    compiled_templates.each do |template|
      tenant_templates << set_template(template.name, template.content, template.directory, template.transformed_content)
      content << template.transformed_content
    end

    Apartment::Tenant.switch @subdomain do
      Template.import tenant_templates, validate: false, on_duplicate_key_update: [:content, :transformed_content]
    end

    content
  end

  def create_bundle
    templates_dir = "#{Rails.root}/app/javascripts/src/customer/themes/#{@theme.directory}/templates"
    templates = []

    Dir.glob("#{templates_dir}/**/*.rt") do |file|
      file_content = File.read file
      file_name = File.basename file, ".*"
      file_directory = File.basename File.dirname(file)
      transformed_content = Rt.transform(file_content, {modules: "none", name: "#{file_name}RT"})

      templates << set_template(file_name, file_content, file_directory, transformed_content)
    end

    Template.import templates, validate: false, on_duplicate_key_update: [:content, :transformed_content]
  end

  def set_template file_name, file_content, file_directory, transformed_content
    Apartment::Tenant.switch(@subdomain) unless @subdomain.nil?
    template = Template.where(name: file_name, theme_id: @theme.id).first_or_initialize
    template.content = file_content
    template.directory = file_directory
    template.transformed_content = transformed_content
    template
  end
end
