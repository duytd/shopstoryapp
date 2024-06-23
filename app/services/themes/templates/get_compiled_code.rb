class Themes::Templates::GetCompiledCode < ApplicationInteraction
  object :theme
  string :subdomain

  def execute
    Apartment::Tenant.switch subdomain do
      content = ""

      compiled_templates = Template.where(theme_id: theme.id)

      compiled_templates.each do |template|
        content << template.transformed_content
      end

      content
    end
  end
end
