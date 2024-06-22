class EmailTemplateService
  TEMPLATE_PATH = "#{Rails.root}/app/views/customer/template_mailer"

  def create_initial_data
    templates = []

    Dir.glob("#{TEMPLATE_PATH}/**/*.liquid") do |file|
      file_name = File.basename file
      file_content = File.read file
      templates << EmailTemplate.new(name: file_name, content: file_content)
    end

    EmailTemplate.import templates
  end
end
