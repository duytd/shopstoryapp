class Themes::Templates::CreateFiles < ApplicationInteraction
  object :theme
  string :subdomain

  def execute
    Apartment::Tenant.switch(subdomain) do
      templates_dir = "#{Rails.root}/app/javascript/src/customer/themes/#{theme.directory}/templates"
      templates = []

      Dir.glob("#{templates_dir}/**/*.rt") do |file|
        file_content = File.read file
        file_name = File.basename file, ".*"
        file_directory = File.basename File.dirname(file)
        transformed_content = Template.transform(file_content, file_name)

        templates << set_template(file_name, file_content, file_directory, transformed_content)
      end

      Template.import templates, validate: false, on_duplicate_key_update: [:content, :transformed_content]
    end
  end

  private

  def set_template file_name, file_content, file_directory, transformed_content
    template = Template.where(name: file_name, theme_id: theme.id).first_or_initialize
    template.content = file_content
    template.directory = file_directory
    template.transformed_content = transformed_content
    template
  end
end
